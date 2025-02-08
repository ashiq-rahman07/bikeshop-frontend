import { Outlet, Link } from 'react-router-dom';

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-2xl font-poppins font-bold mb-6">Dashboard</h2>
        <nav>
          <ul className="space-y-2">
            <li>
              <Link to="/dashboard" className="block hover:bg-gray-700 p-2 rounded">Profile</Link>
            </li>
            <li>
              <Link to="/dashboard/orders" className="block hover:bg-gray-700 p-2 rounded">Orders</Link>
            </li>
            <li>
              <Link to="/dashboard/settings" className="block hover:bg-gray-700 p-2 rounded">Settings</Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-6 bg-gray-100">
        <Outlet /> {/* This will render the child routes */}
      </main>
    </div>
  );
};

export default DashboardLayout;