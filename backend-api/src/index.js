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
    products: [Product!]!
    orders: [Order!]!
  }

  type Customer {
    id: Int!
    name: String!
    email: String!
    description: String
    createdAt: DateTime!
    updatedAt: DateTime!
    orders: [Order]
  }

  type Order {
    id: Int!
    totalPrice: Float!
  }

  type Product {
    id: Int!
    name: String!
    price: Float!
    createdAt: DateTime!
    updatedAt: DateTime!
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
      if (parent.orders && parent.orders.length > 0) {
        return parent.orders;
      } else {
        return [];
      }
    },
  },
  Mutation: {
    createCustomer: async (_, { name, email, description }) => {
      const newCustomer = await prisma.customer.create({
        data: {
          name,
          email,
          description,
        },
      });

      return newCustomer;
    },
    updateCustomer: async (_, { id, name, email, description }) => {
      const updatedCustomer = await prisma.customer.update({
        where: { id },
        data: {
          name,
          email,
          description,
        },
      });

      return updatedCustomer;
    },
    deleteCustomer: async (_, { id }) => {
      const deletedCustomer = await prisma.customer.delete({
        where: { id },
      });

      return deletedCustomer;
    },
    createOrder: async (_, { customerId, totalPrice }) => {
      const newOrder = await prisma.order.create({
        data: {
          customerId,
          totalPrice,
        },
      });
      return newOrder;
    },
    updateOrder: async (_, { id, totalPrice }) => {
      const updatedOrder = await prisma.order.update({
        where: { id },
        data: {
          totalPrice,
        },
      });
      return updatedOrder;
    },
    deleteOrder: async (_, { id }) => {
      const deletedOrder = await prisma.order.delete({
        where: { id },
      });
      return deletedOrder;
    },
    createProduct: async (_, { name, price }) => {
      const newProduct = await prisma.product.create({
        data: {
          name,
          price,
        },
      });
      return newProduct;
    },
    updateProduct: async (_, { id, name, price }) => {
      const updatedProduct = await prisma.product.update({
        where: { id },
        data: {
          name,
          price,
        },
      });
      return updatedProduct;
    },
    deleteProduct: async (_, { id }) => {
      const deletedProduct = await prisma.product.delete({
        where: { id },
      });
      return deletedProduct;
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
