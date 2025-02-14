import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";


const DashboardLayout = () => {
const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  const menuItems = [
    {
      name: 'Product Management',
      path: '/dashboard/products',
      icon: '🛍️',
    },
    {
      name: 'Order Management',
      path: '/dashboard/orders',
      icon: '📦',
    },
    {
      name: 'User Profile',
      path: '/dashboard/profile',
      icon: '👤',
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`bg-gray-800 text-white w-64 space-y-6 py-7 px-2 fixed inset-y-0 left-0 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-200 ease-in-out`}
      >
        <div className="text-white flex items-center space-x-2 px-4">
          <span className="text-2xl font-extrabold">Dashboard</span>
        </div>
        <nav>
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center space-x-2 py-2 px-4 rounded transition-colors ${
                location.pathname === item.path
                  ? 'bg-gray-700 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
        <Link to='/'>Back To Home</Link>
      </div>

      {/* Main Content */}
      <div className={`flex-1 ${isSidebarOpen ? 'ml-64' : 'ml-0'} transition-all duration-200`}>
        {/* Header */}
        <header className="bg-white shadow-md p-4">
          <div className="flex justify-between items-center">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-gray-700 focus:outline-none"
            >
              {isSidebarOpen ? '◀️' : '▶️'}
            </button>
            <div className="text-xl font-poppins font-bold">Welcome, Admin!</div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          <Outlet /> {/* This will render the nested routes */}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;