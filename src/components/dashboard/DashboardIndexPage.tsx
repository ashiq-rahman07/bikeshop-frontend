import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

const DashboardIndexPage: React.FC = () => {
  // Mock data for demonstration
  const metrics = [
    { title: 'Total Sales', value: '$12,345', change: '+5%' },
    { title: 'Total Orders', value: '1,234', change: '+10%' },
    { title: 'Total Customers', value: '567', change: '+3%' },
    { title: 'Inventory Alerts', value: '5', change: '-2%' },
  ];

  const recentOrders = [
    { id: '12345', customer: 'John Doe', date: '2025-02-14', status: 'Shipped' },
    { id: '12346', customer: 'Jane Smith', date: '2025-02-15', status: 'Processing' },
    { id: '12347', customer: 'Mike Johnson', date: '2025-02-16', status: 'Pending' },
  ];

  const inventoryAlerts = [
    { product: 'Mountain Bike', stock: 2 },
    { product: 'Road Bike', stock: 5 },
    { product: 'Helmet', stock: 3 },
  ];

  return (
    <>
    <Helmet>
    <title>Dashboard-Admin-Classic Riders</title>
        

    </Helmet>
      <div className="p-6 bg-gray-100 dark:bg-gray-900 dark:text-gray-100 text-gray-900  min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Welcome Back, Admin!</h1>
        <p className="">this page demo.later update</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 dark:text-gray-100 p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold ">{metric.title}</h3>
            <p className="text-2xl font-bold mt-2">{metric.value}</p>
            <p className="text-sm text-green-500">{metric.change}</p>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-white p-6 dark:bg-gray-800 dark:text-gray-100 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-bold mb-4">Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full dark:bg-gray-800 dark:text-gray-100">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-900 dark:text-gray-100">
                <th className="py-2 px-4 text-left">Order ID</th>
                <th className="py-2 px-4 text-left">Customer</th>
                <th className="py-2 px-4 text-left">Date</th>
                <th className="py-2 px-4 text-left">Status</th>
              </tr>
            </thead>
            <tbody >
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-b dark:border-gray-600 border-gray-300 dark:bg-gray-800 dark:text-gray-100">
                  <td className="py-2 px-4">{order.id}</td>
                  <td className="py-2 px-4">{order.customer}</td>
                  <td className="py-2 px-4">{order.date}</td>
                  <td className="py-2 px-4">
                    <span
                      className={`px-2 py-1 text-sm rounded-full ${
                        order.status === 'Shipped'
                          ? 'bg-green-100 text-green-800'
                          : order.status === 'Processing'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inventory Overview */}
      <div className="bg-white dark:bg-gray-800 dark:text-gray-100 p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-bold mb-4">Inventory Alerts</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {inventoryAlerts.map((item, index) => (
            <div key={index} className="bg-red-50 dark:bg-gray-900 dark:text-gray-100 p-4 rounded-lg">
              <h3 className="text-lg font-semibold  text-red-800">{item.product}</h3>
              <p className="text-sm  text-red-600">Only {item.stock} left in stock</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Links */}
      <div className="bg-white dark:bg-gray-800 dark:text-gray-100 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Quick Links</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 dark:bg-gray-800 dark:text-gray-100">
          <Link
            to="/dashboard/products"
            className="bg-blue-50 dark:bg-gray-900 dark:text-gray-100 p-4 rounded-lg text-blue-800 hover:bg-blue-100 transition-colors"
          >
            <h3 className="text-lg font-semibold">Manage Products</h3>
            <p className="text-sm">Add, edit, or remove products</p>
          </Link>
          <Link
            to="/dashboard/orders"
            className="bg-green-50 p-4 dark:bg-gray-900 dark:text-gray-100 rounded-lg text-green-800 hover:bg-green-100 transition-colors"
          >
            <h3 className="text-lg font-semibold">View Orders</h3>
            <p className="text-sm">Track and manage orders</p>
          </Link>
          <Link
            to="/dashboard/customers"
            className="bg-purple-50 p-4  dark:bg-gray-900 dark:text-gray-100 rounded-lg text-purple-800 hover:bg-purple-100 transition-colors"
          >
            <h3 className="text-lg font-semibold">Customer Management</h3>
            <p className="text-sm">View and manage customer data</p>
          </Link>
        </div>
      </div>
    </div>
    </>
  );
};

export default DashboardIndexPage;