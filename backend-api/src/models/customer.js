const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const customerModel = {
  async createCustomer(name, email, description) {
    return await prisma.customer.create({
      data: {
        name,
        email,
        description,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  },

  async updateCustomer(id, name, email, description, orders) {
    return await prisma.customer.update({
      where: { id },
      data: {
        name,
        email,
        description,
        orders: {
          update: orders.map(order => ({
            where: { id: order.id },
            data: {
              totalPrice: order.totalPrice,
            },
          })),
        },
        updatedAt: new Date(),
      },
      include: {
        orders: true,
      },
    });
  },

  async deleteCustomer(id) {
    return await prisma.customer.delete({
      where: { id },
    });
  },

  async createOrder(customerId, totalPrice) {
    return await prisma.order.create({
      data: {
        customerId,
        totalPrice,
      },
    });
  },

  async updateOrder(id, totalPrice) {
    return await prisma.order.update({
      where: { id },
      data: {
        totalPrice,
      },
    });
  },

  async deleteOrder(id) {
    return await prisma.order.delete({
      where: { id },
    });
  },

  async createProduct(name, price) {
    return await prisma.product.create({
      data: {
        name,
        price,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  },

  async updateProduct(id, name, price) {
    return await prisma.product.update({
      where: { id },
      data: {
        name,
        price,
        updatedAt: new Date(),
      },
    });
  },

  async deleteProduct(id) {
    return await prisma.product.delete({
      where: { id },
    });
  },

  async getAllCustomers() {
    return await prisma.customer.findMany({
      include: {
        orders: true,
      },
    });
  },

  async getAllProducts() {
    return await prisma.product.findMany();
  },

  async getAllOrders() {
    return await prisma.order.findMany();
  },
};

module.exports = customerModel;
