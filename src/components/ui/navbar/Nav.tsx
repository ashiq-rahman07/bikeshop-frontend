
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Menu, X, User, LogOut, Search, Heart, Bike } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout, useCurrentToken } from "@/redux/features/user/authSlice";
import { FaRegUserCircle } from "react-icons/fa";
import CartSlide from "./CartSlide";



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

const Navbar = () => {
  // const { user, logout, isAdmin } = useAuth();
  const token = useAppSelector(useCurrentToken);
  const { totalItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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

  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  const dispatch = useAppDispatch();
    const handleLogout = () => {
      dispatch(logout());
    };

 
  return (
    <div className="w-full fixed top-0 z-50 font-montserrat shadow-sm">
    {/* Announcement Bar */}
    <div className="bg-gradient-to-r from-primary to-secondary text-white text-center text-xs md:text-sm py-1.5 font-medium animate-fade-in">
      🚚 Free shipping on all orders over $500! Use code: <strong>BIKELOVE</strong>
    </div>

    <nav className={`bg-white/70 backdrop-blur-md shadow-md transition-all ${isScrolled ? 'py-2' : 'py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <Bike className="w-8 h-8 text-primary" />
          <span className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            ClassicRider
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-700">
          {['Home', 'Bikes','Gears', 'About','Financing'].map((label, i) => (
            <Link
              key={i}
              to={label === 'Home' ? '/' : `/${label.toLowerCase()}`}
              className="relative hover:text-primary transition"
            >
              {label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}

          {/* Auth / User Dropdown */}
          {token ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-1 hover:text-primary"
              >
                <FaRegUserCircle className="text-lg" />
                <span>Mr Name</span>
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-lg shadow-md z-50">
                  <Link to="/dashboard" className="block px-4 py-2 hover:bg-gray-100">Dashboard</Link>
                  <Link to="/dashboard/profile" className="block px-4 py-2 hover:bg-gray-100">Profile</Link>
                  <button onClick={handleLogout} className="block w-full text-left px-4 py-2 hover:bg-gray-100">Logout</button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/signin" className="hover:text-primary">Login</Link>
              <Link to="/register">
                <Button className="bg-gradient-to-r from-primary to-secondary text-white">Sign Up</Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center gap-3">
          {token && <CartSlide isScrolled={isScrolled} />}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-700 focus:outline-none">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          {['Home', 'Bikes', 'About','Financing'].map((label, i) => (
            <Link
              key={i}
              to={label === 'Home' ? '/' : `/${label.toLowerCase()}`}
              onClick={() => setIsMenuOpen(false)}
              className="block px-6 py-3 text-gray-700 hover:bg-gray-100"
            >
              {label}
            </Link>
          ))}

          {token ? (
            <>
              <Link to="/dashboard" className="block px-6 py-3 hover:bg-gray-100">Dashboard</Link>
              <Link to="/dashboard/profile" className="block px-6 py-3 hover:bg-gray-100">Profile</Link>
              <button onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="block w-full text-left px-6 py-3 hover:bg-gray-100">Logout</button>
            </>
          ) : (
            <>
              <Link to="/signin" className="block px-6 py-3 hover:bg-gray-100">Login</Link>
              <Link to="/register" className="block px-6 py-3 hover:bg-gray-100">Sign Up</Link>
            </>
          )}
        </div>
      )}
    </nav>
  </div>
);
};

export default Navbar;
