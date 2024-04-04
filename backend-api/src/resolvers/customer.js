const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const customerResolvers = {
  Query: {
    customers: async () => {
      return prisma.customer.findMany();
    },
    customer: async (_, { id }) => {
      return prisma.customer.findUnique({
        where: { id }
      });
    },
    orders: async (_, { customerId }) => {
      return prisma.order.findMany({
        where: {
          customerId
        }
      });
    },
    order: async (_, { id }) => {
      return prisma.order.findUnique({
        where: { id }
      });
    },
    products: async (_, { orderId }) => {
      return prisma.product.findMany({
        where: {
          orderId
        }
      });
    },
    product: async (_, { id }) => {
      return prisma.product.findUnique({
        where: { id }
      });
    },
  },
  Mutation: {
    createCustomer: async (_, { name, email, description }) => {
      return prisma.customer.create({
        data: {
          name,
          email,
          description
        }
      });
    },
    createOrder: async (_, { totalPrice, customerId }) => {
      return prisma.order.create({
        data: {
          totalPrice,
          customer: {
            connect: { id: customerId }
          }
        }
      });
    },
    createProduct: async (_, { name, price, orderId }) => {
      return prisma.product.create({
        data: {
          name,
          price,
          order: {
            connect: { id: orderId }
          }
        }
      });
    },
    updateCustomer: async (_, { id, name, email, description }) => {
      return prisma.customer.update({
        where: { id },
        data: {
          name,
          email,
          description
        }
      });
    },
    deleteCustomer: async (_, { id }) => {
      return prisma.customer.delete({
        where: { id }
      });
    },
    deleteOrder: async (_, { id }) => {
      return prisma.order.delete({
        where: { id }
      });
    },
    deleteProduct: async (_, { id }) => {
      return prisma.product.delete({
        where: { id }
      });
    },
  },
  Customer: {
    description: async (parent) => {
      return parent.description;
    },
    orders: async (parent) => {
      return prisma.order.findMany({
        where: {
          customerId: parent.id
        }
      });
    },
    createdAt: async (parent) => {
      return parent.createdAt;
    },
    updatedAt: async (parent) => {
      return parent.updatedAt;
    },
    email: async (parent) => {
      return parent.email;
    },
    name: async (parent) => {
      return parent.name;
    },
  },
  Order: {
    totalPrice: async (parent) => {
      return parent.totalPrice;
    },
    customer: async (parent) => {
      return prisma.customer.findUnique({
        where: {
          id: parent.customerId
        }
      });
    },
    createdAt: async (parent) => {
      return parent.createdAt;
    },
    updatedAt: async (parent) => {
      return parent.updatedAt;
    },
    products: async (parent) => {
      return prisma.product.findMany({
        where: {
          orderId: parent.id
        }
      });
    },
  },
  Product: {
    name: async (parent) => {
      return parent.name;
    },
    price: async (parent) => {
      return parent.price;
    },
    createdAt: async (parent) => {
      return parent.createdAt;
    },
    updatedAt: async (parent) => {
      return parent.updatedAt;
    },
    order: async (parent) => {
      return prisma.order.findUnique({
        where: {
          id: parent.orderId
        }
      });
    },
  },
};

module.exports = customerResolvers;
