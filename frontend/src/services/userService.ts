import api from './api';

export interface Address {
  street: string;
  city: string;
  state: string;
  pincode: string;
}

export interface DietaryPreferences {
  isVegetarian: boolean;
  spiceLevel: 'mild' | 'medium' | 'spicy';
  allergies: string[];
  dietaryRestrictions: string[];
}

export interface UserProfile {
  _id: string;
  email: string;
  name: string;
  phone: string;
  role: string;
  isVerified: boolean;
  address?: Address;
  preferences?: DietaryPreferences;
  createdAt?: string;
  updatedAt?: string;
}

export interface UpdateProfileData {
  name: string;
  phone: string;
  address?: Address;
  preferences?: DietaryPreferences;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

class UserService {
  private readonly baseUrl = '/users';

  async getProfile(): Promise<UserProfile> {
    const response = await api.get('/auth/me');
    return response.data;
  }

  async updateProfile(data: UpdateProfileData): Promise<UserProfile> {
    const response = await api.put('/users/profile', data);
    return response.data;
  }

  async changePassword(data: ChangePasswordData): Promise<void> {
    await api.post('/users/change-password', data);
  }
}

export const userService = new UserService(); 