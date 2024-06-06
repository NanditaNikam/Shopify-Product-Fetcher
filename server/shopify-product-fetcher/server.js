const express = require('express');
const axios = require('axios');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());

const shopifyApiUrl = 'https://messold101.myshopify.com/admin/api/2022-01';
const apiKey = process.env.API_KEY;
const apiPassword = process.env.API_PASSWORD;

app.get('/products', async (req, res) => {
  try {
    const response = await axios.get(`${shopifyApiUrl}/products.json`, {
      auth: {
        username: apiKey,
        password: apiPassword
      }
    });
    res.json(response.data.products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching products' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));