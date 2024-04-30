import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/home';
import CustomersPage from './pages/CustomersPage';
import OrdersPage from './pages/OrdersPage';
import ProductsPage from './pages/ProductsPage';
import SearchBar from './components/SearchBar';
import './css/style.css';

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <Router>
      <div className="app-container">
        <header className="topbar">
          <nav className="navbar">
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/customers">Customers</a></li>
              <li><a href="/orders">Orders</a></li>
              <li><a href="/products">Products</a></li>
            </ul>
            <SearchBar handleSearch={handleSearch} />
          </nav>
        </header>
        <div className="content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/customers" element={<CustomersPage searchQuery={searchQuery} />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/products" element={<ProductsPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
