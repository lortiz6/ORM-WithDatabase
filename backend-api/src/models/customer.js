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

  async getAllCustomers() {
    return await prisma.customer.findMany({
      include: {
        orders: true,
      },
    });
  },
};

module.exports = customerModel;
