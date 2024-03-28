import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_CUSTOMERS } from '../queries';

const CustomerList = () => {
  const { loading, error, data } = useQuery(GET_CUSTOMERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Customer List</h2>
      <ul>
        {data.customers.map((customer) => (
          <li key={customer.id}>{customer.name} - {customer.email}</li>
        ))}
      </ul>
    </div>
  );
};

export default CustomerList;