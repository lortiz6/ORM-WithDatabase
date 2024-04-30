import React, { useEffect, useState } from 'react';
import { getAllOrders } from '../services/api';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getAllOrders();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div>
      <h1>Orders</h1>
      <div>
        {orders.map((order) => (
          <div key={order.id}>
            <h3>Order ID: {order.id}</h3>
            <p>Total Price: ${order.totalPrice}</p>
            {}
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrdersPage;
