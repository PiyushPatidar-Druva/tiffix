import React from 'react';
import DashboardLayout from '../../components/dashboard/DashboardLayout';

const Overview: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard Overview</h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-indigo-100 text-indigo-500">
                <span className="text-2xl">📦</span>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Active Subscriptions</h3>
                <p className="text-3xl font-semibold text-gray-900">2</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 text-green-500">
                <span className="text-2xl">🛍️</span>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Total Orders</h3>
                <p className="text-3xl font-semibold text-gray-900">12</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 text-blue-500">
                <span className="text-2xl">💰</span>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Total Spent</h3>
                <p className="text-3xl font-semibold text-gray-900">₹2,400</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
            <div className="mt-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="p-2 rounded-full bg-green-100 text-green-500">
                    <span>✓</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900">Order Delivered</p>
                    <p className="text-sm text-gray-500">Lunch - Veg Thali</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">2 hours ago</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="p-2 rounded-full bg-blue-100 text-blue-500">
                    <span>📦</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900">Subscription Updated</p>
                    <p className="text-sm text-gray-500">Premium Plan</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">1 day ago</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="p-2 rounded-full bg-yellow-100 text-yellow-500">
                    <span>⚠️</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900">Payment Due</p>
                    <p className="text-sm text-gray-500">₹1,200 for next week</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">2 days ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Overview; 