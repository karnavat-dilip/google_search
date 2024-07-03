const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path =require('path')
require('dotenv').config();

const app = express();
const port = 4000;

app.use(cors());
app.use(express.static(path.join(__dirname, '../frontend/build')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
  });
  
app.get('/search', async (req, res) => {
  const query = req.query.q;
  const apiKey = process.env.GOOGLE_API_KEY;
  const cx = process.env.SEARCH_ENGINE_ID;

  try {
    const response = await axios.get(`https://www.googleapis.com/customsearch/v1`, {
      params: {
        key: apiKey,
        cx: cx,
        q: query
      }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
