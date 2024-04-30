import React, { useState } from 'react';
import { createCustomer } from '../services/api';

const CustomerForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createCustomer(name, email, description);
      setName('');
      setEmail('');
      setDescription('');
    } catch (error) {
      console.error('Error creating customer:', error);
    }
  };

  return (
    <div>
      <h2>Create Customer</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description"></textarea>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CustomerForm;
