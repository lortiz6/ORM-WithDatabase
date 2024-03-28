const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const customerModel = {
  async createCustomer(name, email) {
    return await prisma.customer.create({
      data: {
        name,
        email,
      },
    });
  },
  async updateCustomer(id, name, email) {
    return await prisma.customer.update({
      where: { id },
      data: {
        name,
        email,
      },
    });
  },
  async deleteCustomer(id) {
    return await prisma.customer.delete({
      where: { id },
    });
  },
  async getAllCustomers() {
    return await prisma.customer.findMany();
  },
};

module.exports = customerModel;
