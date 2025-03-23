import React from 'react';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import { CreditCardIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

const transactions = [
  {
    id: 'TXN001',
    date: '2024-03-20',
    description: 'Pro Plan Subscription',
    amount: '₹1,999',
    status: 'success'
  },
  {
    id: 'TXN002',
    date: '2024-02-20',
    description: 'Pro Plan Subscription',
    amount: '₹1,999',
    status: 'success'
  },
  {
    id: 'TXN003',
    date: '2024-01-20',
    description: 'Basic Plan Subscription',
    amount: '₹999',
    status: 'success'
  }
];

const VendorBilling: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">Billing & Payments</h1>
            <p className="mt-2 text-sm text-gray-700">
              Manage your payment methods and view transaction history
            </p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Payment Methods */}
          <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Payment Methods</h3>
              <div className="mt-5">
                <div className="rounded-md bg-gray-50 px-6 py-5">
                  <div className="flex items-center space-x-3">
                    <CreditCardIcon className="h-8 w-8 text-gray-400" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900">Visa ending in 4242</p>
                      <p className="text-sm text-gray-500">Expires 12/24</p>
                    </div>
                    <div>
                      <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                        Default
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <button
                    type="button"
                    className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                  >
                    Add Payment Method
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Billing Information */}
          <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Billing Information</h3>
              <div className="mt-5">
                <div className="rounded-md bg-gray-50 px-6 py-5">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-900">Tiffix Restaurant</p>
                    <p className="text-sm text-gray-500">GST: 29ABCDE1234F1Z5</p>
                    <p className="text-sm text-gray-500">123 Main Street, Bangalore - 560001</p>
                  </div>
                </div>
                <div className="mt-6">
                  <button
                    type="button"
                    className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                  >
                    Update Information
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Transaction History */}
        <div className="mt-8">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h2 className="text-lg font-medium text-gray-900">Transaction History</h2>
              <p className="mt-2 text-sm text-gray-700">A list of all transactions on your account.</p>
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
              <button
                type="button"
                className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
              >
                <DocumentTextIcon className="-ml-1 mr-2 h-5 w-5 text-gray-400" />
                Download Invoices
              </button>
            </div>
          </div>
          <div className="mt-8 flex flex-col">
            <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Transaction ID
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Date
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Description
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Amount
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {transactions.map((transaction) => (
                        <tr key={transaction.id}>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {transaction.id}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {transaction.date}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {transaction.description}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {transaction.amount}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm">
                            <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                              {transaction.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default VendorBilling; 