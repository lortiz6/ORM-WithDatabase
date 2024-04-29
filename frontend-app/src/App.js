import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CustomersPage from './pages/CustomersPage';
import OrdersPage from './pages/OrdersPage';
import ProductsPage from './pages/ProductsPage';
import './css/style.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/customers" element={<CustomersPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/products" element={<ProductsPage />} />
      </Routes>
    </Router>
  );
}

function Home() {
  return (
    <div>
      <h1>Welcome to ORM - Customer Management App</h1>
      <ul>
        <li><a href="/customers">Customers</a></li>
        <li><a href="/orders">Orders</a></li>
        <li><a href="/products">Products</a></li>
      </ul>
    </div>
  );
}

export default App;
