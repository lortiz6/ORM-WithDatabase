const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');

const prisma = new PrismaClient();

const app = express();

const typeDefs = gql`
  type Query {
    customers: [Customer!]!
    products: [Product!]!
    orders: [Order!]!
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
    customer: Customer!
    products: [Product!]!
    createdAt: String!
    updatedAt: String!
  }

  type Product {
    id: Int!
    name: String!
    price: Float!
    createdAt: String!
    updatedAt: String!
    order: Order
  }

  type Mutation {
    createCustomer(name: String!, email: String!, description: String): Customer!
    updateCustomer(id: Int!, name: String!, email: String!, description: String): Customer!
    deleteCustomer(id: Int!): Customer!
    createOrder(customerId: Int!, totalPrice: Float!): Order!
    updateOrder(id: Int!, totalPrice: Float!): Order!
    deleteOrder(id: Int!): Order!
    createProduct(name: String!, price: Float!): Product!
    updateProduct(id: Int!, name: String!, price: Float!): Product!
    deleteProduct(id: Int!): Product!
  }
`;

const resolvers = {
  Query: {
    customers: async () => {
      return await prisma.customer.findMany();
    },
    products: async () => {
      return await prisma.product.findMany();
    },
    orders: async () => {
      return await prisma.order.findMany();
    },
  },
  Customer: {
    orders: async (parent) => {
      return await prisma.customer
        .findUnique({ where: { id: parent.id } })
        .orders();
    },
  },
  Order: {
    customer: async (parent) => {
      return await prisma.order
        .findUnique({ where: { id: parent.id } })
        .customer();
    },
    products: async (parent) => {
      return await prisma.order
        .findUnique({ where: { id: parent.id } })
        .products();
    },
  },
  Product: {
    order: async (parent) => {
      return await prisma.product
        .findUnique({ where: { id: parent.id } })
        .order();
    },
  },
  Mutation: {
    createCustomer: async (_, { name, email, description }) => {
      return await prisma.customer.create({
        data: {
          name,
          email,
          description,
        },
      });
    },
    updateCustomer: async (_, { id, name, email, description }) => {
      return await prisma.customer.update({
        where: { id },
        data: {
          name,
          email,
          description,
        },
      });
    },
    deleteCustomer: async (_, { id }) => {
      return await prisma.customer.delete({
        where: { id },
      });
    },
    createOrder: async (_, { customerId, totalPrice }) => {
      return await prisma.order.create({
        data: {
          customerId,
          totalPrice,
        },
      });
    },
    updateOrder: async (_, { id, totalPrice }) => {
      return await prisma.order.update({
        where: { id },
        data: {
          totalPrice,
        },
      });
    },
    deleteOrder: async (_, { id }) => {
      return await prisma.order.delete({
        where: { id },
      });
    },
    createProduct: async (_, { name, price }) => {
      return await prisma.product.create({
        data: {
          name,
          price,
        },
      });
    },
    updateProduct: async (_, { id, name, price }) => {
      return await prisma.product.update({
        where: { id },
        data: {
          name,
          price,
        },
      });
    },
    deleteProduct: async (_, { id }) => {
      return await prisma.product.delete({
        where: { id },
      });
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

async function startServer() {
  await server.start();

  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 4000;

  app.use(cors());

  app.get('/', (req, res) => {
    res.send('Server is running. Visit /graphql to access the GraphQL API.');
  });

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}${server.graphqlPath}`);
  });
}

startServer().catch((error) => {
  console.error('Error starting server:', error);
});
