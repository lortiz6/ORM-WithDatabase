import axios from 'axios';

const API_BASE_URL = 'http://localhost:4000';

export const getAllCustomers = async () => {
  const response = await axios.get(`${API_BASE_URL}/customers`);
  return response.data;
};

export const createCustomer = async (name, email, description) => {
  const response = await axios.post(`${API_BASE_URL}/customers`, {
    name,
    email,
    description
  });
  return response.data;
};

export const updateCustomer = async (id, name, email, description) => {
  const response = await axios.put(`${API_BASE_URL}/customers/${id}`, {
    name,
    email,
    description
  });
  return response.data;
};

export const deleteCustomer = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/customers/${id}`);
  return response.data;
};

export const getAllOrders = async () => {
  const response = await axios.get(`${API_BASE_URL}/orders`);
  return response.data;
};

export const createOrder = async (customerId, totalPrice) => {
  const response = await axios.post(`${API_BASE_URL}/orders`, {
    customerId,
    totalPrice
  });
  return response.data;
};

export const updateOrder = async (id, totalPrice) => {
  const response = await axios.put(`${API_BASE_URL}/orders/${id}`, {
    totalPrice
  });
  return response.data;
};

export const deleteOrder = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/orders/${id}`);
  return response.data;
};

export const getAllProducts = async () => {
  const response = await axios.get(`${API_BASE_URL}/products`);
  return response.data;
};

export const createProduct = async (name, price) => {
  const response = await axios.post(`${API_BASE_URL}/products`, {
    name,
    price
  });
  return response.data;
};

export const updateProduct = async (id, name, price) => {
  const response = await axios.put(`${API_BASE_URL}/products/${id}`, {
    name,
    price
  });
  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/products/${id}`);
  return response.data;
};
