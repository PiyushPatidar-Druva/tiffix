import api from './api'; // Ensure this path is correct

const orderApi = {
  getOrders: async () => {
    const response = await api.get('/orders'); // This should match the backend route
    return response.data;
  },
};

export default orderApi; 