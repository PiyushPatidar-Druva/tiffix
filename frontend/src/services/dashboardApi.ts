import api from './api';

interface DashboardStats {
  todayOrders: number;
  pendingDeliveries: number;
  totalMenuItems: number;
  todayRevenue: number;
}

const dashboardApi = {
  getVendorStats: async (): Promise<DashboardStats> => {
    const response = await api.get('/vendor/dashboard/stats');
    return response.data;
  }
};

export default dashboardApi; 