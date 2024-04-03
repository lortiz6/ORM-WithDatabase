import React, { useEffect, useState } from 'react';
import { getProducts, createProduct, deleteProduct } from '../services/api';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [newProductData, setNewProductData] = useState({ name: '', price: 0 });

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  const handleCreateProduct = async () => {
    await createProduct(newProductData);

    const updatedProducts = await getProducts();
    setProducts(updatedProducts);

    setNewProductData({ name: '', price: 0 });
  };

  const handleDeleteProduct = async (productId) => {
    await deleteProduct(productId);

    const updatedProducts = await getProducts();
    setProducts(updatedProducts);
  };

  return (
    <div>
      <h1>Products</h1>
      <div>
        <input
          type="text"
          placeholder="Name"
          value={newProductData.name}
          onChange={(e) => setNewProductData({ ...newProductData, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          value={newProductData.price}
          onChange={(e) => setNewProductData({ ...newProductData, price: parseFloat(e.target.value) })}
        />
        <button onClick={handleCreateProduct}>Create Product</button>
      </div>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price}
            <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsPage;
