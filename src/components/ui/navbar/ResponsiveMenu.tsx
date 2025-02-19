/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';

import { Navlinks } from './Navbar';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../../redux/hooks';
import { logout } from '../../../redux/features/user/authSlice';
// import { IoMdCloseCircle } from "react-icons/io";
interface ResponsiveProps {
  showMenu: boolean;

  token: string | null;
}
const ResponsiveMenu: React.FC<ResponsiveProps> = ({ showMenu, token }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logout());
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
  // console.log("showMenu", showMenu);
  return (
    <div
      className={`${
        showMenu ? 'left-0' : '-left-[100%]'
      } fixed bottom-0 top-0 z-20 flex h-screen w-[75%] flex-col justify-between bg-white dark:bg-gray-900 dark:text-white px-8 pb-6 pt-2 text-black transition-all duration-200 md:hidden rounded-r-xl shadow-md`}
    >
      <div className="card">
        <div className="flex items-center justify-start gap-3">
          {token ? (
            <div
              className="relative"
              ref={dropdownRef}
              // onMouseEnter={() => setIsDropdownOpen(true)}
            >
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="text-2xl font-medium hover:text-primary  py-2    "
              >
                <FaUserCircle size={50} />
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute text-gray-900 dark:text-gray-100 right-0 left-0 mt-2 w-48 bg-gray-200 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
                  <div className="p-2">
                    <Link
                      to="/dashboard"
                      className=" block px-4 py-2 hover:text-primary"
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/dashboard/profile"
                      className="block px-4 py-2 hover:text-primary  rounded-lg"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:text-primary  rounded-lg"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/signin"
              className="text-lg font-medium  hover:text-primary py-2 hover:border-b-2 hover:border-primary transition-colors duration-500"
            >
              SIGN IN
            </Link>
          )}
          {/* <FaUserCircle size={50} /> */}
          <div className="flex  items-center ">
            <div>
              <h1>Hello User</h1>
              <h1 className="text-sm text-slate-500">Premium user</h1>
            </div>
          </div>
        </div>
        <nav className="mt-6">
          <ul className="space-y-2 text-xl">
            {Navlinks.map((data) => (
              <li key={data.id}>
                <a href={data.link} className="mb-5 inline-block">
                  {data.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="footer"></div>
    </div>
  );
};

export default ResponsiveMenu;
