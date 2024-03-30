const express = require('express');
const cors = require('cors');
const { ApolloServer, gql } = require('apollo-server-express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());

const typeDefs = gql`
  type Query {
    customers: [Customer!]!
  }

  type Customer {
    id: Int!
    name: String!
    email: String!
    description: String
    createdAt: String!
    updatedAt: String!
    orders: [Order]
  }

  type Order {
    id: Int!
    totalPrice: Float!
  }

  type Mutation {
    createCustomer(name: String!, email: String!): Customer!
    updateCustomer(id: Int!, name: String!, email: String!): Customer!
    deleteCustomer(id: Int!): Customer!
    createOrder(customerId: Int!, totalPrice: Float!): Order!
  }
`;

const resolvers = {
  Query: {
    customers: async () => {
      return await prisma.customer.findMany();
    },
  },
  Customer: {
    orders: async (parent) => {
      if (parent.orders && parent.orders.length > 0) {
        return parent.orders;
      } else {
        return [];
      }
    },
  },
  Mutation: {
    createCustomer: async (_, { name, email }) => {
      const newCustomer = await prisma.customer.create({
        data: {
          name,
          email,
        },
      });

      const customerWithTimestamps = await prisma.customer.findUnique({
        where: {
          id: newCustomer.id,
        },
      });

      return {
        ...customerWithTimestamps,
        createdAt: customerWithTimestamps.createdAt.toISOString(),
        updatedAt: customerWithTimestamps.updatedAt.toISOString(),
      };
    },
    updateCustomer: async (_, { id, name, email }) => {
      const updatedCustomer = await prisma.customer.update({
        where: { id },
        data: {
          name,
          email,
        },
      });

      const customerWithTimestamps = await prisma.customer.findUnique({
        where: {
          id: updatedCustomer.id,
        },
      });

      return {
        ...customerWithTimestamps,
        createdAt: customerWithTimestamps.createdAt.toISOString(),
        updatedAt: customerWithTimestamps.updatedAt.toISOString(),
      };
    },
    deleteCustomer: async (_, { id }) => {
      const deletedCustomer = await prisma.customer.delete({
        where: { id },
      });

      return {
        ...deletedCustomer,
        createdAt: deletedCustomer.createdAt.toISOString(),
        updatedAt: deletedCustomer.updatedAt.toISOString(),
      };
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

async function startServer() {
  await server.start();

  server.applyMiddleware({ app });

  app.get('/', (req, res) => {
    res.send('Server is running. Visit /graphql to access the GraphQL API.');
  });

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

startServer().catch((error) => {
  console.error('Error starting server:', error);
});
