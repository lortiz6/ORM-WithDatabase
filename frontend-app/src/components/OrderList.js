import React from 'react';

const OrderList = ({ orders }) => {
  return (
    <div>
      <h2>Orders</h2>
      <ul>
        {orders.map(order => (
          <li key={order.id}>
            {order.totalPrice}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OrderList;
