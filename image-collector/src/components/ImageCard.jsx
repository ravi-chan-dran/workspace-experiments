import { useState } from 'react'

// Resize image via canvas and return a data URL
async function resizeImage(dataUrl, width, height) {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0, width, height)
      resolve(canvas.toDataURL('image/png'))
    }
    img.src = dataUrl
  })
}

// Convert DataURL string to Blob
function dataUrlToBlob(dataUrl) {
  const arr = dataUrl.split(',')
  const mime = arr[0].match(/:(.*?);/)[1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) u8arr[n] = bstr.charCodeAt(n)
  return new Blob([u8arr], { type: mime })
}

export default function ImageCard({ image, onUpdate, onDelete }) {
  const [mode, setMode] = useState('width')
  const [width, setWidth] = useState(256)
  const [height, setHeight] = useState(256)
  const ratio = image.height / image.width

  const applyResize = async () => {
    let w = width
    let h = height
    if (mode === 'width') {
      h = Math.round(width * ratio)
    } else if (mode === 'height') {
      w = Math.round(height / ratio)
    }
    const resizedUrl = await resizeImage(image.dataUrl, w, h)
    onUpdate({
      ...image,
      resized: { dataUrl: resizedUrl, width: w, height: h },
    })
  }

  const upload = async () => {
    onUpdate({ ...image, uploadStatus: 'uploading' })
    const dataUrl = image.resized?.dataUrl || image.dataUrl
    const blob = dataUrlToBlob(dataUrl)
    const file = new File([blob], image.name, { type: blob.type })
    const form = new FormData()
    form.append('file', file)
    try {
      const res = await fetch('https://httpbin.org/post', {
        method: 'POST',
        body: form,
      })
      if (!res.ok) throw new Error('failed')
      onUpdate({ ...image, uploadStatus: 'success' })
    } catch (err) {
      console.error(err)
      onUpdate({ ...image, uploadStatus: 'error' })
    }
  }

  return (
    <div className="relative bg-white rounded shadow p-2 flex flex-col items-center animate-fadeIn">
      <img src={image.dataUrl} alt={image.name} className="w-full h-32 object-cover mb-2" />
      {image.resized && (
        <img src={image.resized.dataUrl} alt="resized" className="w-full h-32 object-cover mb-2 border" />
      )}
      <div className="text-sm font-semibold truncate w-full text-center" title={image.name}>{image.name}</div>
      <div className="text-xs text-gray-500 mb-1">{new Date(image.time).toLocaleString()}</div>

      <div className="flex flex-wrap gap-2 text-xs w-full justify-center mb-2">
        <select className="border px-1" value={mode} onChange={(e) => setMode(e.target.value)}>
          <option value="width">Width</option>
          <option value="height">Height</option>
          <option value="both">Both</option>
        </select>
        <input
          type="number"
          className="border w-16 px-1"
          value={width}
          onChange={(e) => setWidth(parseInt(e.target.value) || 0)}
          disabled={mode === 'height'}
        />
        <input
          type="number"
          className="border w-16 px-1"
          value={height}
          onChange={(e) => setHeight(parseInt(e.target.value) || 0)}
          disabled={mode === 'width'}
        />
        <button className="border px-2" onClick={() => { setWidth(256); setHeight(256) }}>256</button>
        <button className="border px-2" onClick={() => { setWidth(512); setHeight(512) }}>512</button>
        <button className="border px-2" onClick={() => { setWidth(1024); setHeight(1024) }}>1024</button>
        <button className="border px-2 bg-blue-500 text-white" onClick={applyResize}>Resize</button>
      </div>

      <div className="flex gap-2 mb-1">
        <button
          className="border px-2 py-0.5 bg-green-500 text-white"
          onClick={upload}
          disabled={image.uploadStatus === 'uploading'}
        >
          {image.uploadStatus === 'uploading' ? (
            <span className="inline-block w-4 h-4 border-2 rounded-full spinner animate-spin"></span>
          ) : 'Upload'}
        </button>
        {image.uploadStatus === 'success' && (
          <span className="text-green-600 text-xs self-center">Uploaded</span>
        )}
        {image.uploadStatus === 'error' && (
          <span className="text-red-600 text-xs self-center">Failed</span>
        )}
      </div>

      <button
        className="absolute top-1 right-1 text-red-500 bg-white rounded-full px-2 py-0.5 text-xs"
        onClick={() => onDelete(image.id)}
      >
        Delete
      </button>
    </div>
  )
}
