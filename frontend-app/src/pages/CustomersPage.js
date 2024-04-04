import React, { useEffect, useState } from 'react';
import { getAllCustomers, createCustomer, deleteCustomer } from '../services/api';

const CustomersPage = () => {
  const [customers, setCustomers] = useState([]);
  const [newCustomerData, setNewCustomerData] = useState({ name: '', email: '', description: '' });

  useEffect(() => {
    const fetchCustomers = async () => {
      const data = await getAllCustomers();
      setCustomers(data);
    };
    fetchCustomers();
  }, []);

  const handleCreateCustomer = async () => {
    await createCustomer(newCustomerData);
    const updatedCustomers = await getAllCustomers();
    setCustomers(updatedCustomers);
    setNewCustomerData({ name: '', email: '', description: '' });
  };

  const handleDeleteCustomer = async (customerId) => {
    await deleteCustomer(customerId);
    const updatedCustomers = await getAllCustomers();
    setCustomers(updatedCustomers);
  };

  return (
    <div>
      <h1>Customers</h1>
      <div>
        <input
          type="text"
          placeholder="Name"
          value={newCustomerData.name}
          onChange={(e) => setNewCustomerData({ ...newCustomerData, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={newCustomerData.email}
          onChange={(e) => setNewCustomerData({ ...newCustomerData, email: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={newCustomerData.description}
          onChange={(e) => setNewCustomerData({ ...newCustomerData, description: e.target.value })}
        />
        <button onClick={handleCreateCustomer}>Create Customer</button>
      </div>
      <ul>
        {customers.map((customer) => (
          <li key={customer.id}>
            {customer.name} - {customer.email} - {customer.description}
            <button onClick={() => handleDeleteCustomer(customer.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomersPage;
