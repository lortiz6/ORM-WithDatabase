import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_ORDER } from './mutations';

const CreateOrderForm = ({ customerId }) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [createOrder] = useMutation(CREATE_ORDER);

  const handleCreateOrder = async (e) => {
    e.preventDefault();
    try {
      await createOrder({
        variables: {
          customerId,
          totalPrice: parseFloat(totalPrice),
        },
      });
      setSuccessMessage('Order created successfully.');
      setErrorMessage('');
    } catch (error) {
      console.error('Error creating order:', error);
      setSuccessMessage('');
      setErrorMessage('Failed to create order. Please try again.');
    }
  };

  return (
    <div>
      <h2>Create Order</h2>
      <form onSubmit={handleCreateOrder}>
        <label htmlFor="totalPrice">Total Price:</label>
        <input
          type="number"
          id="totalPrice"
          value={totalPrice}
          onChange={(e) => setTotalPrice(e.target.value)}
          required
        />
        <button type="submit">Create Order</button>
      </form>
      {successMessage && <div>{successMessage}</div>}
      {errorMessage && <div>{errorMessage}</div>}
    </div>
  );
};

export default CreateOrderForm;
