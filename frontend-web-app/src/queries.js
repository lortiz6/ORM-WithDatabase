import { gql } from '@apollo/client';

export const GET_CUSTOMERS = gql`
  query GetCustomers {
    customers {
      id
      name
      email
      description
      orders {
        id
        totalPrice
      }
      createdAt
      updatedAt
    }
  }
`;
