import React, { useEffect, useState } from 'react';
import { getAllOrders } from '../services/api';

function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const fetchedOrders = await getAllOrders();
      setOrders(fetchedOrders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  return (
    <div>
      <h1>Orders Page</h1>
      <ul>
        {orders.map(order => (
          <li key={order.id}>{order.totalPrice}</li>
        ))}
      </ul>
    </div>
  );
}

export default OrdersPage;
