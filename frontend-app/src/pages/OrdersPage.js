import React, { useEffect, useState } from 'react';
import { getOrders, createOrder, deleteOrder } from '../services/api';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [newOrderData, setNewOrderData] = useState({ totalPrice: 0 });

  useEffect(() => {
    const fetchOrders = async () => {
      const data = await getOrders();
      setOrders(data);
    };
    fetchOrders();
  }, []);

  const handleCreateOrder = async () => {
    await createOrder(newOrderData);
    const updatedOrders = await getOrders();
    setOrders(updatedOrders);
    setNewOrderData({ totalPrice: 0 });
  };

  const handleDeleteOrder = async (orderId) => {
    await deleteOrder(orderId);
    const updatedOrders = await getOrders();
    setOrders(updatedOrders);
  };

  return (
    <div>
      <h1>Orders</h1>
      <div>
        <input
          type="number"
          placeholder="Total Price"
          value={newOrderData.totalPrice}
          onChange={(e) => setNewOrderData({ ...newOrderData, totalPrice: parseFloat(e.target.value) })}
        />
        <button onClick={handleCreateOrder}>Create Order</button>
      </div>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            Total Price: ${order.totalPrice}
            <button onClick={() => handleDeleteOrder(order.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrdersPage;
