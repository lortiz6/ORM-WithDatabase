import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CustomersPage from './pages/CustomersPage';
import OrdersPage from './pages/OrdersPage';
import ProductsPage from './pages/ProductsPage';
import './css/style.css'; // Import style.css here

function App() {
  return (
    <Router>
      <div className="container">
        <h1>ORM - Customer Management App</h1>
        <div className="content">
          <Switch>
            <Route exact path="/customers" component={CustomersPage} />
            <Route exact path="/orders" component={OrdersPage} />
            <Route exact path="/products" component={ProductsPage} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
