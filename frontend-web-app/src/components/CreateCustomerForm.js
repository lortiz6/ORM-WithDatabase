import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { CREATE_CUSTOMER } from './mutations';

const CreateCustomerForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();

  const [createCustomer] = useMutation(CREATE_CUSTOMER);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    createCustomer({ variables: { name, email } })
      .then(() => {
        setName('');
        setEmail('');
        setSuccessMessage('Customer created successfully.');
        setErrorMessage('');
        // Redirect to customer list
        history.push('/Customer-List');
      })
      .catch((error) => {
        console.error('Error creating customer:', error);
        setSuccessMessage('');
        setErrorMessage('Failed to create customer. Please try again.');
      });
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Create Customer</button>
      </form>
      {successMessage && <div>{successMessage}</div>}
      {errorMessage && <div>{errorMessage}</div>}
    </div>
  );
};

export default CreateCustomerForm;
