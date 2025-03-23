import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Customer } from '../../types/user';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../components/dashboard/DashboardLayout';

const CustomerDashboard: React.FC = () => {
  const { user } = useAuth();
  const customer = user as Customer;

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="min-w-0 flex-1">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
              Welcome back, {customer.name}!
            </h2>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Active Subscription Card */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Active Subscription</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">Premium Plan</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <Link
                  to="/customer/subscriptions"
                  className="font-medium text-indigo-700 hover:text-indigo-900"
                >
                  View details
                </Link>
              </div>
            </div>
          </div>

          {/* Today's Meals Card */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Today's Meals</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">2 meals</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <Link
                  to="/customer/menu"
                  className="font-medium text-indigo-700 hover:text-indigo-900"
                >
                  View menu
                </Link>
              </div>
            </div>
          </div>

          {/* Delivery Status Card */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Next Delivery</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">In 2 hours</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <Link
                  to="/customer/track-delivery"
                  className="font-medium text-indigo-700 hover:text-indigo-900"
                >
                  Track delivery
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Orders Section */}
        <div className="mt-8">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h2 className="text-xl font-semibold text-gray-900">Recent Orders</h2>
              <p className="mt-2 text-sm text-gray-700">A list of your recent meal deliveries.</p>
            </div>
          </div>
          <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead>
                    <tr>
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                        Date
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Meal
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Status
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Rating
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                        Mar 15, 2024
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">Paneer Butter Masala</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-green-600">Delivered</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">★★★★☆</td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                        Mar 14, 2024
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">Dal Tadka</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-green-600">Delivered</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">★★★★★</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <Link
          to="/customer/orders"
          className="text-indigo-600 hover:text-indigo-900"
        >
          View All Orders
        </Link>
      </div>
    </DashboardLayout>
  );
};

export default CustomerDashboard; 