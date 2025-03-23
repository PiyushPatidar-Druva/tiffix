import api from './api';

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'delivered' | 'cancelled';
  deliveryDate: string;
  createdAt: string;
  subscriptionId?: string;
}

export const orderService = {
  getUserOrders: async (): Promise<Order[]> => {
    const response = await api.get('/orders/user');
    return response.data;
  },

  getOrderDetails: async (orderId: string): Promise<Order> => {
    const response = await api.get(`/orders/${orderId}`);
    return response.data;
  },

  cancelOrder: async (orderId: string): Promise<Order> => {
    const response = await api.post(`/orders/${orderId}/cancel`);
    return response.data;
  },
}; 