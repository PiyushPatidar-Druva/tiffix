import React from 'react';
import DashboardLayout from '../../components/dashboard/DashboardLayout';

const Billing: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">Billing</h1>
          <div className="mt-6">
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900">Billing Information</h2>
              <p className="mt-2 text-sm text-gray-600">
                View and manage your billing information, payment methods, and transaction history.
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Billing; 