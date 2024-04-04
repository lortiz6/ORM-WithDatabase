import React, { useEffect, useState } from 'react';
import { getAllCustomers, createCustomer, updateCustomer, deleteCustomer } from '../services/api';

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
    await createCustomer(newCustomerData.name, newCustomerData.email, newCustomerData.description);
    const updatedCustomers = await getAllCustomers();
    setCustomers(updatedCustomers);
    setNewCustomerData({ name: '', email: '', description: '' });
  };

  const handleUpdateCustomer = async (id, newName, newEmail, newDescription) => {
    await updateCustomer(id, newName, newEmail, newDescription);
    const updatedCustomers = await getAllCustomers();
    setCustomers(updatedCustomers);
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
            <input
              type="text"
              value={customer.name}
              onChange={(e) => handleUpdateCustomer(customer.id, e.target.value, customer.email, customer.description)}
            />
            <input
              type="email"
              value={customer.email}
              onChange={(e) => handleUpdateCustomer(customer.id, customer.name, e.target.value, customer.description)}
            />
            <input
              type="text"
              value={customer.description || ''}
              onChange={(e) => handleUpdateCustomer(customer.id, customer.name, customer.email, e.target.value)}
            />
            <button onClick={() => handleDeleteCustomer(customer.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomersPage;
