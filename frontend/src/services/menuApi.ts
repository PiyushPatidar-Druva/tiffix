import api from './api';
import { AxiosResponse } from 'axios';

export interface MenuItem {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: 'breakfast' | 'lunch' | 'dinner';
  isVegetarian: boolean;
  isAvailable: boolean;
  image?: string;
  vendorId: string;
}

export interface CreateMenuItemDto {
  name: string;
  description: string;
  price: number;
  category: 'breakfast' | 'lunch' | 'dinner';
  isVegetarian: boolean;
  isAvailable: boolean;
  image?: string;
}

export interface UpdateMenuItemDto extends Partial<CreateMenuItemDto> {
  _id: string;
}

const menuApi = {
  // Get all menu items for the vendor
  getMenuItems: async (): Promise<MenuItem[]> => {
    const response: AxiosResponse<MenuItem[]> = await api.get('/vendor/menu');
    return response.data;
  },

  // Create a new menu item
  createMenuItem: async (menuItem: CreateMenuItemDto): Promise<MenuItem> => {
    const response: AxiosResponse<MenuItem> = await api.post('/vendor/menu', menuItem);
    return response.data;
  },

  // Update a menu item
  updateMenuItem: async (menuItem: UpdateMenuItemDto): Promise<MenuItem> => {
    const response: AxiosResponse<MenuItem> = await api.put(`/vendor/menu/${menuItem._id}`, menuItem);
    return response.data;
  },

  // Delete a menu item
  deleteMenuItem: async (menuItemId: string): Promise<void> => {
    await api.delete(`/vendor/menu/${menuItemId}`);
  },

  // Toggle menu item availability
  toggleAvailability: async (menuItemId: string): Promise<MenuItem> => {
    try {
      const url = `/vendor/menu/${menuItemId}/toggle-availability`;
      const response: AxiosResponse<MenuItem> = await api.put(url);
      return response.data;
    } catch (error: any) {
      console.error('Error toggling availability:', error);
      throw error;
    }
  }
};

export default menuApi; 