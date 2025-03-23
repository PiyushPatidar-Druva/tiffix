import api from './api';

export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: 'weekly' | 'monthly';
  mealsPerDay: number;
  features: string[];
}

export interface UserSubscription {
  id: string;
  planId: string;
  status: 'active' | 'paused' | 'cancelled';
  startDate: string;
  endDate: string;
  plan: SubscriptionPlan;
}

export const subscriptionService = {
  getPlans: async (): Promise<SubscriptionPlan[]> => {
    const response = await api.get('/subscriptions/plans');
    return response.data;
  },

  getUserSubscriptions: async (): Promise<UserSubscription[]> => {
    const response = await api.get('/subscriptions/user');
    return response.data;
  },

  subscribe: async (planId: string): Promise<UserSubscription> => {
    const response = await api.post('/subscriptions/subscribe', { planId });
    return response.data;
  },

  pauseSubscription: async (subscriptionId: string): Promise<UserSubscription> => {
    const response = await api.post(`/subscriptions/${subscriptionId}/pause`);
    return response.data;
  },

  resumeSubscription: async (subscriptionId: string): Promise<UserSubscription> => {
    const response = await api.post(`/subscriptions/${subscriptionId}/resume`);
    return response.data;
  },

  cancelSubscription: async (subscriptionId: string): Promise<UserSubscription> => {
    const response = await api.post(`/subscriptions/${subscriptionId}/cancel`);
    return response.data;
  },
}; 