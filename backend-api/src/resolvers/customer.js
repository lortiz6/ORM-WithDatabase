const customerModel = require('../models/customer');
const customerResolvers = {
  Query: {

    customers: async () => {
      return await customerModel.getAllCustomers();
    },
  },
  Mutation: {

    createCustomer: async (_, { name, email }) => {
      return await customerModel.createCustomer(name, email);
    },

    updateCustomer: async (_, { id, name, email }) => {
      return await customerModel.updateCustomer(id, name, email);
    },

    deleteCustomer: async (_, { id }) => {
      return await customerModel.deleteCustomer(id);
    },
  },
};

module.exports = customerResolvers;
