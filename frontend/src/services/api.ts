import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to add the auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const token = localStorage.getItem('token');

    // Only attempt token refresh if:
    // 1. We have a token in localStorage
    // 2. The error is 401 (Unauthorized)
    // 3. We haven't tried to refresh the token yet
    if (token && error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Try to refresh the token
        const response = await api.post('/auth/refresh-token');
        const { token } = response.data;

        // Update the token in localStorage
        localStorage.setItem('token', token);

        // Update the token in the request headers
        originalRequest.headers.Authorization = `Bearer ${token}`;

        // Retry the original request
        return api(originalRequest);
      } catch (refreshError) {
        // If refresh fails, clear token and redirect to login
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        
        // Only redirect to login if we're not already on the login page
        const currentPath = window.location.pathname;
        if (!currentPath.includes('/login') && !currentPath.includes('/register')) {
          window.location.href = '/login';
        }
        return Promise.reject(refreshError);
      }
    }

    // If the error is 404 for refresh-token endpoint, don't try to refresh again
    if (error.response?.status === 404 && originalRequest.url?.includes('/auth/refresh-token')) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export interface RegisterData {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface VerifyOTPData {
  userId: string;
  otp: string;
}

export interface ResendOTPData {
  userId: string;
}

// Create auth-specific API endpoints
export const authAPI = {
  login: (credentials: LoginCredentials) => api.post('/auth/login', credentials),
  register: (data: RegisterData) => api.post('/auth/register', data),
  verifyOTP: (data: { userId: string; otp: string }) => api.post('/auth/verify-otp', data),
  resendOTP: (data: { userId: string }) => api.post('/auth/resend-otp', data),
  refreshToken: () => api.post('/auth/refresh-token'),
};

export default api; 