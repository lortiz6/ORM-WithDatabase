import React, { useEffect, useState } from 'react';
import { getCustomers, createCustomer, deleteCustomer } from '../services/api';


const CustomersPage = () => {
  const [customers, setCustomers] = useState([]);
  const [newCustomerData, setNewCustomerData] = useState({ name: '', email: '', description: '' });

  useEffect(() => {
    const fetchCustomers = async () => {
      const data = await getCustomers();
      setCustomers(data);
    };
    fetchCustomers();
  }, []);

  const handleCreateCustomer = async () => {
    await createCustomer(newCustomerData);
    // Refresh the list of customers after creating a new one
    const updatedCustomers = await getCustomers();
    setCustomers(updatedCustomers);
    // Clear the form fields after creating a new customer
    setNewCustomerData({ name: '', email: '', description: '' });
  };

  const handleDeleteCustomer = async (customerId) => {
    await deleteCustomer(customerId);
    // Refresh the list of customers after deleting one
    const updatedCustomers = await getCustomers();
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