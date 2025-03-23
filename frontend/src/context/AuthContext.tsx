import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserType, LoginCredentials, RegisterData, AuthResponse, RegistrationResponse } from '../types/user';
import api from '../services/api';

interface AuthContextType {
  user: UserType | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<AuthResponse>;
  register: (data: RegisterData) => Promise<RegistrationResponse>;
  verifyOTP: (data: { userId: string; otp: string }) => Promise<AuthResponse>;
  logout: () => void;
  error: string | null;
  updateUser: (userData: UserType) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize user state from localStorage
  const [user, setUser] = useState<UserType | null>(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        return JSON.parse(storedUser);
      } catch {
        localStorage.removeItem('user');
        return null;
      }
    }
    return null;
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize auth state
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    setIsLoading(false);
  }, []);

  const login = async (credentials: LoginCredentials) => {
    try {
      setError(null);
      const response = await api.post<AuthResponse>('/auth/login', credentials);
      const { user: userData, token } = response.data;
      
      // Store token and user data
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      
      // Set authorization header
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(userData);
      return response.data;
    } catch (err: any) {
      const message = err.response?.data?.message || 'Failed to login';
      setError(message);
      // Clear any existing auth data on error
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      delete api.defaults.headers.common['Authorization'];
      setUser(null);
      throw new Error(message);
    }
  };

  const register = async (data: RegisterData) => {
    try {
      setError(null);
      const response = await api.post<RegistrationResponse>('/auth/register', data);
      return response.data;
    } catch (err: any) {
      const message = err.response?.data?.message || 'Failed to register';
      setError(message);
      throw new Error(message);
    }
  };

  const verifyOTP = async (data: { userId: string; otp: string }) => {
    try {
      setError(null);
      const response = await api.post<AuthResponse>('/auth/verify-otp', data);
      const { user: userData, token } = response.data;
      
      // Store token and user data
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      
      // Set authorization header
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(userData);
      return response.data;
    } catch (err: any) {
      const message = err.response?.data?.message || 'Failed to verify OTP';
      setError(message);
      throw new Error(message);
    }
  };

  const logout = () => {
    // Clear stored data
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Reset authorization header
    delete api.defaults.headers.common['Authorization'];
    setUser(null);
  };

  const updateUser = (userData: UserType) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    verifyOTP,
    logout,
    error,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext; 