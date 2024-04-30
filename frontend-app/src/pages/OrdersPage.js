import React from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_ORDERS = gql`
  query GetOrders {
    orders {
      id
      totalPrice
      createdAt
      updatedAt
    }
  }
`;

const OrdersPage = () => {
  const { loading, error, data } = useQuery(GET_ORDERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Orders</h2>
      <ul>
        {data.orders.map((order) => (
          <li key={order.id}>
            Order ID: {order.id}, Total Price: {order.totalPrice}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrdersPage;