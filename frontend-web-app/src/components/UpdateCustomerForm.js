import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { UPDATE_CUSTOMER } from './mutations';

const UpdateCustomerForm = ({ customer }) => {
  const [name, setName] = useState(customer.name);
  const [email, setEmail] = useState(customer.email);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();

  const [updateCustomer] = useMutation(UPDATE_CUSTOMER);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    updateCustomer({ variables: { id: customer.id, name, email } })
      .then(() => {
        setSuccessMessage('Customer updated successfully.');
        setErrorMessage('');
        history.push('/Customer-List');
      })
      .catch((error) => {
        console.error('Error updating customer:', error);
        setSuccessMessage('');
        setErrorMessage('Failed to update customer. Please try again.');
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
        <button type="submit">Update Customer</button>
      </form>
      {successMessage && <div>{successMessage}</div>}
      {errorMessage && <div>{errorMessage}</div>}
    </div>
  );
};

export default UpdateCustomerForm;
