import React from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_CUSTOMERS = gql`
  query GetCustomers {
    customers {
      id
      name
      email
      description
      createdAt
      updatedAt
    }
  }
`;

const CustomersPage = () => {
  const { loading, error, data } = useQuery(GET_CUSTOMERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Customers</h2>
      <ul>
        {data.customers.map((customer) => (
          <li key={customer.id}>
            <strong>{customer.name}</strong> - {customer.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomersPage;