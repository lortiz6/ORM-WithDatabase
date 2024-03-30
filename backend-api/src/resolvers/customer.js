const customerModel = require('../models/customer');

const customerResolvers = {
  Query: {
    customers: async () => {
      const customers = await customerModel.getAllCustomersWithOrders();
      console.log("Retrieved customers with orders:", customers);
      return customers;
    },
  },
  Customer: {
    orders: async (parent) => {
      if (parent.orders && parent.orders.length > 0) {
        return parent.orders || [];
      } else {
        console.log("No orders found for customer:", parent.id);
        return [];
      }
    },
  },
  Mutation: {
    createCustomer: async (_, { name, email, description }) => {
      return await customerModel.createCustomer(name, email, description);
    },
    updateCustomer: async (_, { id, name, email, description, orders }) => {
      return await customerModel.updateCustomer(id, name, email, description, orders);
    },
    deleteCustomer: async (_, { id }) => {
      return await customerModel.deleteCustomer(id);
    },
  },
};

module.exports = customerResolvers;
