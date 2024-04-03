import React from 'react';


const CustomerList = ({ customers }) => {
  return (
    <div>
      <h2>Customers</h2>
      <ul>
        {customers.map(customer => (
          <li key={customer.id}>
            {customer.name} - {customer.email} - {customer.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CustomerList;
