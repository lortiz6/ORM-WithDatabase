import React, { useEffect, useState } from 'react';
import { getAllCustomers } from '../services/api';

const CustomerPage = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    async function fetchCustomers() {
      try {
        const customersData = await getAllCustomers();
        setCustomers(customersData);
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    }
    fetchCustomers();
  }, []);

  return (
    <div>
      <h1>Customer Page</h1>
      <div>
        {}
        {customers.map(customer => (
          <div key={customer.id}>
            <h2>{customer.name}</h2>
            <p>Email: {customer.email}</p>
            <p>Description: {customer.description}</p>
            {}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CustomerPage;
