import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { DELETE_CUSTOMER } from './mutations';

const DeleteCustomerButton = ({ customerId, onUpdateCustomerList }) => {
  const [deleteCustomer] = useMutation(DELETE_CUSTOMER);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();

  const handleDelete = () => {
    deleteCustomer({ variables: { id: customerId } })
      .then(() => {
        setSuccessMessage('Customer deleted successfully.');
        setErrorMessage('');
        onUpdateCustomerList();
      })
      .catch((error) => {
        console.error('Error deleting customer:', error);
        setSuccessMessage('');
        setErrorMessage('Failed to delete customer. Please try again.');
      });
  };

  return (
    <div>
      <button onClick={handleDelete}>Delete</button>
      {successMessage && <div>{successMessage}</div>}
      {errorMessage && <div>{errorMessage}</div>}
    </div>
  );
};

export default DeleteCustomerButton;
