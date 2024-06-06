const express = require('express');
const axios = require('axios')
const cors = require('cors')

require('dotenv').config()

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

// fetch product data from shopify API

app.get('/api/products', async(req, res) => {
    try{
        const response = await axios.get('https://messold101.myshopify.com/admin/api/2021-01/products.json', {
            headers:{
                'Access-Token' : `https://www.useblackbox.io/editor?id=ce4ce91d-7a2b-4ae3-955c-7c426eeadd67`,
            }
        })

        const products = response.data.produts.map((product) => ({
            id : product.id,
            title: product.title,
            description : product.description,
            category : product.product_type,
            tags : product.tags,
            variants : product.variants.map((variant) => ({
                id : variant.id,
                title: variant.title,
                price: variant.price,
                compare_at_price : variant.compare_at_price,
                sku : variant.sku,
                quantity : variant.quantity,
            })),
        }));
        res.json(products);
    }catch(error){
        console.error("Error in fetching products",error);
    }
});

app.listen(port,() => {
    console.log(`server running on port ${port}`)
})