import { useEffect, useRef, useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { logout, selectCurrentUser } from '../../redux/features/user/authSlice';
import { useGetSingleUserQuery } from '../../redux/features/user/authApi';
import { TUser } from '../../types/alltypes';
import { FaArrowAltCircleLeft, FaRegUserCircle } from 'react-icons/fa';
import DarkMode from '../ui/navbar/DarkMode';

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();
  const user = useAppSelector(selectCurrentUser);

  const navigate = useNavigate();
  const { data } = useGetSingleUserQuery(user?.userId);
  const userProfile = data?.data as TUser;

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const dropdownRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  // const menuItems = [
  //   {
  //     name: 'Product Management',
  //     path: '/dashboard/products',
  //     icon: '🛍️',
  //   },
  //   {
  //     name: 'Order Management',
  //     path: '/dashboard/orders',
  //     icon: '📦',
  //   },
  //   {
  //     name: 'My Order',
  //     path: '/dashboard/my-orders',
  //     icon: '📦',
  //   },
  //   {
  //     name: 'User Profile',
  //     path: '/dashboard/profile',
  //     icon: '👤',
  //   },
  // ];

  return (
    <div className="flex min-h-screen bg-gray-100 flex-col md:flex-row">
      {/* Sidebar */}

      <div
        className={`bg-gray-800 text-white w-64 space-y-6 py-7 px-2 fixed inset-y-0 left-0 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }  transition-transform duration-200 ease-in-out `}
      >
        <div className="text-white flex items-center space-x-2 px-4">
          <Link to="/dashboard" className="text-2xl font-extrabold">
            Dashboard
          </Link>
        </div>
        <nav className="">
          {user?.role === 'admin' && (
            <>
              <Link
                to="/dashboard/products"
                className={`flex hover:bg-gray-700 items-center space-x-2 py-2.5 px-4 rounded transition-colors ${
                  location.pathname === '/dashboard/products'
                    ? 'bg-gray-700 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <span>{'🛍️'}</span>
                <span>Product Management</span>
              </Link>
              <Link
                to="/dashboard/orders"
                className={`flex items-center space-x-2 py-2 px-4 rounded transition-colors ${
                  location.pathname === '/dashboard/orders'
                    ? 'bg-gray-700 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <span>{'🛍️'}</span>
                <span>Order Management</span>
              </Link>
              <Link
                to="/dashboard/customers"
                className={`flex items-center space-x-2 py-2 px-4 rounded transition-colors ${
                  location.pathname === '/dashboard/customers'
                    ? 'bg-gray-700 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <span>{'🛍️'}</span>
                <span>Customer Management </span>
              </Link>
            </>
          )}

          {user?.role === 'customer' && (
            <Link
              to="/dashboard/my-orders"
              className={`flex items-center space-x-2 py-2 px-4 rounded transition-colors ${
                location.pathname === '/dashboard/my-orders'
                  ? 'bg-gray-700 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              <span>{'🛍️'}</span>
              <span>My Orders</span>
            </Link>
          )}

          <Link
            to="/dashboard/profile"
            className={`flex items-center space-x-2 py-2 px-4 rounded transition-colors ${
              location.pathname === '/dashboard/profile'
                ? 'bg-gray-700 text-white'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
            }`}
          >
            <span>{'🛍️'}</span>
            <span>My Profile</span>
          </Link>
        </nav>
        <footer className="mt-6">
          <Link
            to="/"
            className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded transition-colors"
          >
            Back To Home
          </Link>
        </footer>
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 ${
          isSidebarOpen ? 'ml-64' : 'ml-0'
        } transition-all duration-200 `}
      >
        {/* Header */}
        <header className=" shadow-xl border-b dark:border-b-gray-700 p-4 bg-gray-100 dark:bg-gray-900 text-gray-950 dark:text-gray-100">
          <div className="flex justify-between items-center ">
            <button
              onClick={toggleSidebar}
              className=" text-gray-500 focus:outline-none"
            >
              <FaArrowAltCircleLeft size={30} />
            </button>

            <div className="flex justify-center items-center gap-3">
              <div className="text-xl font-poppins font-bold">
                Welcome, {userProfile?.name}
              </div>
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={toggleDropdown}
                  className="text-2xl font-medium hover:text-primary py-2"
                >
                  <FaRegUserCircle />
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute text-gray-900 dark:text-gray-100 right-0 mt-2 w-48 bg-gray-200 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
                    <div className="p-2">
                      <Link
                        to="/dashboard/profile"
                        className="block px-4 py-2 hover:text-primary rounded-lg"
                      >
                        Profile
                      </Link>
                      <Link
                        to="/dashboard"
                        className="block px-4 py-2 hover:text-primary rounded-lg"
                      >
                        Dashboard
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 hover:text-primary rounded-lg"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <DarkMode />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className=" overflow-x-auto dark:bg-gray-900 ">
          <Outlet /> {/* This will render the nested routes */}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

{
  /* <div className="flex min-h-screen bg-gray-100 flex-col md:flex-row"> */
}
{
  /* Sidebar */
}
{
  /* <div
  className={`bg-gray-800 text-white w-64 space-y-6 py-7 px-2 fixed  inset-y-0 left-0 transform ${
    isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
  } md:translate-x-0 transition-transform duration-200 ease-in-out z-50`}
>
  <div className="text-white flex items-center space-x-2 px-4">
    <span className="text-2xl font-extrabold">Dashboard</span>
  </div>
  <nav>
    {user?.role === 'admin' && (
      <>
        <Link
          to="/dashboard/products"
          className={`flex hover:bg-gray-700  items-center space-x-2 py-2.5 px-4 rounded transition-colors ${
            location.pathname === '/dashboard/products'
              ? 'bg-gray-700 text-white'
              : 'text-gray-300 hover:bg-gray-700 hover:text-white'
          }`}
        >
          <span>{'🛍️'}</span>
          <span>Product Management</span>
        </Link>
        <Link
          to="/dashboard/orders"
          className={`flex items-center space-x-2 py-2 px-4 rounded transition-colors ${
            location.pathname === '/dashboard/orders'
              ? 'bg-gray-700 text-white'
              : 'text-gray-300 hover:bg-gray-700 hover:text-white'
          }`}
        >
          <span>{'🛍️'}</span>
          <span> Order Management</span>
        </Link>
      </>
    )}

    {user?.role == 'customer' && (
      <Link
        to="/dashboard/my-orders"
        className={`flex items-center space-x-2 py-2 px-4 rounded transition-colors ${
          location.pathname === '/dashboard/my-orders'
            ? 'bg-gray-700 text-white'
            : 'text-gray-300 hover:bg-gray-700 hover:text-white'
        }`}
      >
        <span>{'🛍️'}</span>
        <span>My Order</span>
      </Link>
    )}

    <Link
      to="/dashboard/profile"
      className={`flex items-center space-x-2 py-2 px-4 rounded transition-colors ${
        location.pathname === '/dashboard/profile'
          ? 'bg-gray-700 text-white'
          : 'text-gray-300 hover:bg-gray-700 hover:text-white'
      }`}
    >
      <span>{'🛍️'}</span>
      <span>My Profile</span>
    </Link>
  </nav>
  <footer>
    <Link to="/">Back To Home</Link>
  </footer>
</div> */
}

{
  /* Main Content */
}
{
  /* <div
  className={`flex-1 ${isSidebarOpen ? 'ml-64' : 'ml-0'} transition-all duration-200`}
>
  {/* Header */
}
// <header className="bg-white shadow-md p-4">
//   <div className="flex justify-between items-center">
//     <button
//       onClick={toggleSidebar}
//       className="md:hidden text-gray-500 focus:outline-none"
//     >
//      <svg
//         className="w-6 h-6"
//         fill="none"
//         stroke="currentColor"
//         viewBox="0 0 24 24"
//       >
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           strokeWidth="2"
//           d="M4 6h16M4 12h16m-7 6h7"
//         >

//         </path>
//       </svg>
//     </button>

//     <div className='flex justify-center items-center gap-3'>
//     <div className="text-xl font-poppins font-bold">
//       Welcome, {userProfile?.name}
//     </div>
//       <div
//         className="relative"
//         ref={dropdownRef}
//         // onMouseEnter={() => setIsDropdownOpen(true)}
//       >
//         <button
//           onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//           className="text-2xl font-medium hover:text-primary  py-2    "
//         >
//           <FaRegUserCircle />
//         </button>

//         {/* Dropdown Menu */}

//         {isDropdownOpen && (
//           <div className="absolute text-gray-900 dark:text-gray-100 right-0 mt-2 w-48 bg-gray-200 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
//             <div className="p-2">
//               <Link
//                 to="/dashboard/profile"
//                 className="block px-4 py-2 hover:text-primary  rounded-lg"
//               >
//                 Profile
//               </Link>
//               <button
//                 onClick={handleLogout}
//                 className="w-full text-left px-4 py-2 hover:text-primary  rounded-lg"
//               >
//                 Logout
//               </button>
//             </div>
//           </div>
//         )}

//       </div>

//     </div>
//   </div>
// </header>

//   {/* Page Content */}
//   <main className="p-6">
//     <Outlet /> {/* This will render the nested routes */}
//   </main>
// </div>

// </div> */}
