import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [showProducts, setShowProducts] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/products');
        setProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleClick = () => {
    setShowProducts(!showProducts);
  };

  return (
    <div className='product-list-container'>
      <button className='toggle-button' onClick={handleClick}>{showProducts ? 'Hide Product List' : 'Show Product List'}</button>
      {showProducts && (
        <div className="product-list">
          <h1>List of Products</h1>
          <ul>
            {products.map((product) => (
              <li key={product.id} className="product-item">
                <h2>Product ID: {product.id}</h2>
                <h2>Product Title: {product.title}</h2>
                <h3>Product Description:</h3>
                <p dangerouslySetInnerHTML={{ __html: product.body_html }} />
                <p><strong>Product Category:</strong> {product.product_type}</p>
                <p><strong>Product Tags: </strong>{product.tags}</p>
                <h3>Variants:</h3>
                <ul>
                  {product.variants.map((variant) => (
                    <li key={variant.id} className="variant-item">
                      <strong>Variant ID:</strong> {variant.id}
                      <br />
                      <strong>Variant Title:</strong> {variant.title}
                      <br />
                      <strong>Variant Price:</strong> {variant.price}
                      <br />
                      <strong>Variant Compared Price:</strong> {variant.compare_at_price}
                      <br />
                      <strong>Variant SKU:</strong> {variant.sku}
                      <br />
                      <strong>Variant Quantity:</strong> {variant.inventory_quantity}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProductList;