import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

const CustomerDashboardIndexPage: React.FC = () => {
  // Mock data for demonstration
  const recentOrders = [
    { id: '12345', date: '2025-02-14', status: 'Shipped', total: 120.5 },
    { id: '12346', date: '2025-02-15', status: 'Processing', total: 99.99 },
    { id: '12347', date: '2025-02-16', status: 'Pending', total: 150.0 },
  ];

  const recommendedProducts = [
    {
      id: '1',
      name: 'Mountain Bike',
      price: 499.99,
      image: 'https://i.ibb.co.com/VpsW90v/Modelo-de-motos-h-bridas.jpg',
    },
    {
      id: '2',
      name: 'Road Bike',
      price: 699.99,
      image: 'https://i.ibb.co.com/CH1RH13/NAWA-Technologies.jpg',
    },
    {
      id: '3',
      name: 'Cycling Helmet',
      price: 49.99,
      image:
        'https://i.ibb.co.com/BnJZb7L/the-top-10-street-bikes-we-cant-wait-to-ride-in-2019-ducati-diavel.jpg',
    },
  ];

  return (
    <>
      <Helmet>
        <title>Dashboard-customer-Classic Riders</title>
      </Helmet>
      <div className="p-6 bg-gray-100 dark:bg-gray-900 dark:text-gray-100 text-gray-950 min-h-screen">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">Welcome Back, John!</h1>
          <p className="">this page demo.later update</p>
        </div>

        {/* Recent Orders */}
        <div className="bg-white dark:bg-gray-800  rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-bold  p-4">Recent Orders</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-900">
                  <th className="py-2 px-4 text-left">Order ID</th>
                  <th className="py-2 px-4 text-left">Date</th>
                  <th className="py-2 px-4 text-left">Status</th>
                  <th className="py-2 px-4 text-left">Total</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b dark:border-gray-700 space-y-4"
                  >
                    <td className="py-2 px-4">{order.id}</td>
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
                    <td className="py-2 px-4">${order.total.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recommended Products */}
        <div className="bg-white dark:bg-gray-800  p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-bold mb-4">Recommended for You</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recommendedProducts.map((product) => (
              <div
                key={product.id}
                className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="">${product.price.toFixed(2)}</p>
                <Link
                  to={`/products/${product.id}`}
                  className="mt-2 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  View Product
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-white dark:bg-gray-800 p-6 dark:text-gray-100 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4 ">Quick Links</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              to="/products"
              className="bg-blue-50 dark:bg-gray-950 dark:text-blue-400 p-4 rounded-lg text-blue-800 hover:bg-blue-100 transition-colors"
            >
              <h3 className="text-lg font-semibold">Shop Bikes</h3>
              <p className="text-sm">Explore our latest collection</p>
            </Link>
            <Link
              to="/dashboard/profile"
              className="bg-green-50 dark:bg-gray-950 dark:text-green-400 p-4 rounded-lg text-green-800 hover:bg-green-100 transition-colors"
            >
              <h3 className="text-lg font-semibold">My Profile</h3>
              <p className="text-sm">Update your personal information</p>
            </Link>
            <Link
              to="/about"
              className="bg-purple-50 dark:bg-gray-950 dark:text-purple-400 p-4 rounded-lg text-purple-800 hover:bg-purple-100 transition-colors"
            >
              <h3 className="text-lg font-semibold">Support</h3>
              <p className="text-sm">Get help with your orders</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerDashboardIndexPage;
