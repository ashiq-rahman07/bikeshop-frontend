/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
// import { BiSolidSun, BiSolidMoon } from "react-icons/bi";
import { HiMenuAlt3, HiMenuAlt1 } from 'react-icons/hi';
import ResponsiveMenu from './ResponsiveMenu';
import DarkMode from './DarkMode';
import { Link } from 'react-router-dom';
import CartSlide from './CartSlide';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import {
  logout,
  selectCurrentUser,
  useCurrentToken,
} from '../../../redux/features/user/authSlice';
import { verifyToken } from '../../../utils/verifyToken';
import { FaRegUserCircle } from 'react-icons/fa';

export const Navlinks = [
  {
    id: 1,
    name: 'HOME',
    link: '/',
  },
  {
    id: 2,
    name: 'PRODUCTS',
    link: '/products',
  },
  {
    id: 3,
    name: 'ABOUT',
    link: '/about',
  },
];

// interface NavbarProps {
//   theme: string;
//   setTheme: (theme: string) => void;
// }

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const token = useAppSelector(useCurrentToken);
  // console.log('navbar token', token)
  const user = useAppSelector(selectCurrentUser);
  // console.log("navbar user", user)

  const dropdownRef = useRef<HTMLDivElement>(null);
  // console.log(token);

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

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  return (
    <div
      className="relative z-10 shadow-md w-full dark:bg-gray-950 dark:text-white duration-300
    "
    >
      <div className="container py-2 md:py-0">
        <div className="flex justify-between items-center">
          <div>
            <Link to="/">
              <span className="text-3xl font-bold font-serif">BIKE SHOP</span>
            </Link>
          </div>

          <nav className="hidden md:block">
            <ul className="flex items-center gap-8">
              {Navlinks.map(({ id, name, link }) => (
                <li key={id} className="py-4">
                  <Link
                    to={link}
                    className=" text-lg font-medium  hover:text-primary py-2 hover:border-b-2 hover:border-primary transition-colors duration-500  "
                  >
                    {name}
                  </Link>
                </li>
              ))}

              {/* User Icon or Sign In */}
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
                    <FaRegUserCircle />
                  </button>

                  {/* Dropdown Menu */}
                  {isDropdownOpen && (
                    <div className="absolute text-gray-900 dark:text-gray-100 right-0 mt-2 w-48 bg-gray-200 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
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

              {/* Dashboard Link (Visible Only When Logged In) */}

              {/* <Link to='/cart'>
                Cart
              </Link> */}
              <CartSlide />
              {/* DarkMode feature implement */}
              <DarkMode />
            </ul>
          </nav>

          {/* Mobile view  */}
          <div className="flex items-center gap-4 md:hidden ">
            {/* <Link to='/cart'>
                Cart
              </Link> */}
            <CartSlide />
            {/* dark  mode */}
            <DarkMode />

            {/* Mobile Hamburger icon */}
            {showMenu ? (
              <HiMenuAlt1
                onClick={toggleMenu}
                className=" cursor-pointer transition-all"
                size={40}
              />
            ) : (
              <HiMenuAlt3
                onClick={toggleMenu}
                className="cursor-pointer transition-all"
                size={30}
              />
            )}
          </div>
        </div>
      </div>
      <ResponsiveMenu showMenu={showMenu} token={token} />
    </div>
  );
};

export default Navbar;
