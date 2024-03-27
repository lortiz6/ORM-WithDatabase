const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 4000;

const typeDefs = gql`
  type Query {
    customers: [Customer!]!
  }

  type Customer {
    id: Int!
    name: String!
    email: String!
  }

  type Mutation {
    createCustomer(name: String!, email: String!): Customer!
  }
`;

const resolvers = {
  Query: {
    customers: async () => {
      return await prisma.customer.findMany();
    },
  },
  Mutation: {
    createCustomer: async (_, { name, email }) => {
      return await prisma.customer.create({
        data: {
          name,
          email,
        },
      });
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

async function startServer() {
  await server.start();

// Applying middleware for GraphQL endpoint
  server.applyMiddleware({ app });

  // Define a basic route for the root URL
app.get('/', (req, res) => {
  res.send('Server is running. Visit /graphql to access the GraphQL API.');
});

// Listen for incoming requests on the specified port
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}
// Start the server
startServer().catch((error) => {
  console.error('Error starting server:', error);
});
