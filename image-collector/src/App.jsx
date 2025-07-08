import { useState, useEffect, useCallback } from 'react'
import ImageCard from './components/ImageCard.jsx'

// Key used for storing images in localStorage
const STORAGE_KEY = 'image-collector-gallery-v2'

// Load images from localStorage
const loadImages = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch (err) {
    console.error('Failed to load images', err)
    return []
  }
}

// Save images to localStorage
const saveImages = (images) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(images))
  } catch (err) {
    console.error('Failed to save images', err)
  }
}

function App() {
  const [images, setImages] = useState(() => loadImages())

  // Persist whenever images change
  useEffect(() => {
    saveImages(images)
  }, [images])

  // Handle files selected via input or drag-and-drop
  const handleFiles = useCallback(async (files) => {
    const newImages = []
    for (const file of files) {
      if (!file.type.startsWith('image/')) continue
      const reader = new FileReader()
      const dataUrl = await new Promise((resolve) => {
        reader.onload = () => resolve(reader.result)
        reader.readAsDataURL(file)
      })
      const dims = await new Promise((resolve) => {
        const img = new Image()
        img.onload = () => resolve({ width: img.width, height: img.height })
        img.src = dataUrl
      })
      newImages.push({
        id: crypto.randomUUID(),
        name: file.name,
        time: new Date().toISOString(),
        size: file.size,
        width: dims.width,
        height: dims.height,
        dataUrl,
        resized: null,
        uploadStatus: 'idle',
      })
    }
    if (newImages.length) {
      setImages((prev) => [...newImages, ...prev])
    }
  }, [])

  // Input change handler
  const onInputChange = (e) => {
    const files = Array.from(e.target.files)
    handleFiles(files)
    e.target.value = '' // reset
  }

  // Drag over prevents default to allow drop
  const onDragOver = (e) => {
    e.preventDefault()
  }

  // Handle drop events
  const onDrop = (e) => {
    e.preventDefault()
    const files = Array.from(e.dataTransfer.files)
    handleFiles(files)
  }

  // Delete image by id
  const deleteImage = (id) => {
    setImages((prev) => prev.filter((img) => img.id !== id))
  }

  // Update an image entry
  const updateImage = (updated) => {
    setImages((prev) => prev.map((img) => (img.id === updated.id ? updated : img)))
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <header className="text-2xl font-bold mb-4">Image Collector</header>

      <div
        className="w-full max-w-xl border-2 border-dashed border-gray-400 rounded-md p-6 text-center bg-white"
        onDragOver={onDragOver}
        onDrop={onDrop}
      >
        <p className="mb-2">Drag and drop images here or click to select</p>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={onInputChange}
          className="block mx-auto"
        />
      </div>

      <section
        className="mt-6 grid gap-4 w-full"
        style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}
      >
        {images.map((img) => (
          <ImageCard
            key={img.id}
            image={img}
            onDelete={deleteImage}
            onUpdate={updateImage}
          />
        ))}
      </section>
    </div>
  )
}

export default App
