import React, { useState } from 'react';

const OrderForm = ({ onSubmit }) => {
  const [totalPrice, setTotalPrice] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(totalPrice);
    setTotalPrice('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create New Order</h2>
      <div>
        <label htmlFor="orderTotalPrice">Total Price:</label>
        <input
          type="text"
          id="orderTotalPrice"
          value={totalPrice}
          onChange={(e) => setTotalPrice(e.target.value)}
          required
        />
      </div>
      <button type="submit">Create Order</button>
    </form>
  );
};

export default OrderForm;
