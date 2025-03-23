import React from 'react';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import { CheckIcon } from '@heroicons/react/24/outline';

const plans = [
  {
    name: 'Basic',
    price: '₹999',
    features: [
      'Up to 50 menu items',
      'Basic analytics',
      'Email support',
      'Standard delivery zones'
    ],
    current: false
  },
  {
    name: 'Pro',
    price: '₹1,999',
    features: [
      'Unlimited menu items',
      'Advanced analytics',
      'Priority support',
      'Extended delivery zones',
      'Custom branding',
      'Marketing tools'
    ],
    current: true
  },
  {
    name: 'Enterprise',
    price: '₹4,999',
    features: [
      'All Pro features',
      'Dedicated account manager',
      'Custom integrations',
      'API access',
      'Multiple locations',
      'Advanced reporting'
    ],
    current: false
  }
];

const VendorSubscriptions: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">Subscription Plans</h1>
            <p className="mt-2 text-sm text-gray-700">
              Choose the plan that best fits your business needs
            </p>
          </div>
        </div>

        <div className="mt-12 space-y-4 sm:mt-16 sm:grid sm:grid-cols-3 sm:gap-6 sm:space-y-0 lg:mx-auto lg:max-w-4xl xl:mx-0 xl:max-w-none">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`divide-y divide-gray-200 rounded-lg border ${
                plan.current ? 'border-indigo-500 shadow-md' : 'border-gray-200'
              } bg-white`}
            >
              <div className="p-6">
                <h2 className="text-lg font-medium leading-6 text-gray-900">{plan.name}</h2>
                <p className="mt-4 text-sm text-gray-500">
                  {plan.current && (
                    <span className="inline-flex items-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-800">
                      Current Plan
                    </span>
                  )}
                </p>
                <p className="mt-8">
                  <span className="text-4xl font-bold tracking-tight text-gray-900">{plan.price}</span>
                  <span className="text-base font-medium text-gray-500">/month</span>
                </p>
                <button
                  type="button"
                  className={`mt-8 block w-full rounded-md px-3 py-2 text-center text-sm font-semibold ${
                    plan.current
                      ? 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'
                      : 'bg-indigo-600 text-white hover:bg-indigo-500'
                  }`}
                >
                  {plan.current ? 'Current Plan' : 'Upgrade'}
                </button>
              </div>
              <div className="px-6 pt-6 pb-8">
                <h3 className="text-sm font-medium text-gray-900">What's included</h3>
                <ul className="space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex space-x-3">
                      <CheckIcon className="h-5 w-5 flex-shrink-0 text-green-500" aria-hidden="true" />
                      <span className="text-sm text-gray-500">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default VendorSubscriptions; 