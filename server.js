const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = process.env.PORT || 3000;
const API_URL = 'https://posedirector-service-601906407780.us-west4.run.app';

app.use('/api/random-pose', async (req, res) => {
  try {
    const response = await fetch(`${API_URL}/random-pose`);
    const data = await response.json();
    res.set('Access-Control-Allow-Origin', '*');
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch random pose' });
  }
});

app.use('/api/trending', async (req, res) => {
  try {
    const { seed = 100, start = 0, limit = 10 } = req.query;
    const url = `${API_URL}/trending?seed=${seed}&start=${start}&limit=${limit}`;
    const response = await fetch(url);
    const data = await response.json();
    res.set('Access-Control-Allow-Origin', '*');
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch trending images' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
