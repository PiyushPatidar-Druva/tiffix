import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Customer } from '../../types/user';
import DashboardLayout from '../../components/dashboard/DashboardLayout';

const plans = [
  {
    name: 'Basic',
    price: '₹999',
    description: 'Perfect for occasional meals',
    features: [
      '10 meals per month',
      'Standard menu selection',
      'Fixed delivery schedule',
      'Email support'
    ],
    popular: false
  },
  {
    name: 'Premium',
    price: '₹1,999',
    description: 'Most popular choice for regular meals',
    features: [
      '30 meals per month',
      'Full menu access',
      'Flexible delivery schedule',
      'Priority support',
      'Customizable meal plans'
    ],
    popular: true
  },
  {
    name: 'Family',
    price: '₹3,999',
    description: 'Ideal for families',
    features: [
      '60 meals per month',
      'Full menu access',
      'Multiple delivery locations',
      '24/7 priority support',
      'Family size portions',
      'Special occasion meals'
    ],
    popular: false
  }
];

const Subscriptions: React.FC = () => {
  const { user } = useAuth();
  const customer = user as Customer;

  const handleSubscribe = (planName: string) => {
    // TODO: Implement subscription logic
    console.log('Subscribe to:', planName);
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="sm:flex sm:flex-col sm:align-center">
          <h1 className="text-5xl font-bold text-gray-900 sm:text-center">Meal Plans</h1>
          <p className="mt-5 text-xl text-gray-500 sm:text-center">
            Choose the perfect meal plan for your needs
          </p>
        </div>

        <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-3">
          {plans.map((plan) => (
            <div key={plan.name} className={`rounded-lg shadow-sm divide-y divide-gray-200 ${plan.popular ? 'border-2 border-indigo-500' : 'border'}`}>
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-900">{plan.name}</h2>
                {plan.popular && (
                  <p className="absolute top-0 -translate-y-1/2 transform rounded-full bg-indigo-500 px-4 py-1 text-sm font-semibold text-white">
                    Most popular
                  </p>
                )}
                <p className="mt-4 text-sm text-gray-500">{plan.description}</p>
                <p className="mt-8">
                  <span className="text-4xl font-extrabold text-gray-900">{plan.price}</span>
                  <span className="text-base font-medium text-gray-500">/month</span>
                </p>
                <ul className="space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex">
                      <svg className="flex-shrink-0 w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="ml-3 text-base text-gray-500">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handleSubscribe(plan.name)}
                  className={`mt-8 block w-full rounded-md border border-transparent px-6 py-3 text-center font-medium text-white ${
                    plan.popular
                      ? 'bg-indigo-600 hover:bg-indigo-700'
                      : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'
                  }`}
                >
                  {customer.subscriptionId ? 'Switch Plan' : 'Subscribe'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Subscriptions; 