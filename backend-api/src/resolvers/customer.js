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
    addProductToOrder: async (_, { orderId, productId }) => {
      // Check if both orderId and productId are valid
      const order = await prisma.order.findUnique({
        where: { id: orderId },
      });
      const product = await prisma.product.findUnique({
        where: { id: productId },
      });

      if (!order || !product) {
        throw new Error('Order or product not found');
      }

      // Associate the product with the order
      await prisma.order.update({
        where: { id: orderId },
        data: {
          products: {
            connect: { id: productId },
          },
        },
      });

      // Return the updated order
      return await prisma.order.findUnique({
        where: { id: orderId },
      });
    },

    removeProductFromOrder: async (_, { orderId, productId }) => {
      // Check if both orderId and productId are valid
      const order = await prisma.order.findUnique({
        where: { id: orderId },
      });
      const product = await prisma.product.findUnique({
        where: { id: productId },
      });

      if (!order || !product) {
        throw new Error('Order or product not found');
      }

      // Disassociate the product from the order
      await prisma.order.update({
        where: { id: orderId },
        data: {
          products: {
            disconnect: { id: productId },
          },
        },
      });

      // Return the updated order
      return await prisma.order.findUnique({
        where: { id: orderId },
      });
    },

    assignOrderToCustomer: async (_, { orderId, customerId }) => {
      // Check if both orderId and customerId are valid
      const order = await prisma.order.findUnique({
        where: { id: orderId },
      });
      const customer = await prisma.customer.findUnique({
        where: { id: customerId },
      });

      if (!order || !customer) {
        throw new Error('Order or customer not found');
      }

      // Associate the order with the customer
      await prisma.order.update({
        where: { id: orderId },
        data: {
          customer: {
            connect: { id: customerId },
          },
        },
      });

      // Return the updated order
      return await prisma.order.findUnique({
        where: { id: orderId },
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
