import React from 'react';
import DashboardLayout from '../../components/dashboard/DashboardLayout';

const Dashboard: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
          <div className="mt-6">
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900">Welcome to Tiffix</h2>
              <p className="mt-2 text-sm text-gray-600">
                Manage your meal subscriptions, view orders, and update your profile.
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard; 