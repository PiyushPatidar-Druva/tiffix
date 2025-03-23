import api from './api'; // Ensure this path is correct

const customerApi = {
  // Existing methods...
  getProfile: async () => {
    const response = await api.get('/customers/profile');
    return response.data;
  },

  updateProfile: async (profileData: any) => {
    const response = await api.put('/customers/profile', profileData); // Adjust the endpoint as necessary
    return response.data;
  },
};

export default customerApi; 