const customerModel = require('../models/customer');

const customerResolvers = {
  Query: {
    customers: async () => {
      const customers = await customerModel.getAllCustomers();
      console.log("Retrieved customers:", customers);
      return customers;
    },
    products: async () => {
      return await customerModel.getAllProducts();
    },
    orders: async () => {
      return await customerModel.getAllOrders();
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
    updateCustomer: async (_, { id, name, email, description }) => {
      return await customerModel.updateCustomer(id, name, email, description);
    },
    deleteCustomer: async (_, { id }) => {
      return await customerModel.deleteCustomer(id);
    },
    createOrder: async (_, { customerId, totalPrice }) => {
      return await customerModel.createOrder(customerId, totalPrice);
    },
    updateOrder: async (_, { id, totalPrice }) => {
      return await customerModel.updateOrder(id, totalPrice);
    },
    deleteOrder: async (_, { id }) => {
      return await customerModel.deleteOrder(id);
    },
    createProduct: async (_, { name, price }) => {
      return await customerModel.createProduct(name, price);
    },
    updateProduct: async (_, { id, name, price }) => {
      return await customerModel.updateProduct(id, name, price);
    },
    deleteProduct: async (_, { id }) => {
      return await customerModel.deleteProduct(id);
    },
  },
};

module.exports = customerResolvers;
