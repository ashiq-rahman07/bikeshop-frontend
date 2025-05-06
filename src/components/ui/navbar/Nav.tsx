
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
    <div className="w-full fixed top-0 z-50 shadow-md font-montserrat">
      {/* Announcement Bar */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white text-center text-sm py-1.5 font-medium animate-fade-in">
        Free shipping on all orders over $500! Use code: BIKELOVE
      </div>
      
      <nav className={`w-full transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-md' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center">
                <Bike className="h-8 w-8 mr-2 text-primary" />
                <span className="text-2xl font-montserrat font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">ClassicRider</span>
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <div>
            {/* <div className="hidden md:block">
              <div className={`ml-10 flex items-baseline space-x-6 ${isScrolled ? 'text-gray-950 ':'text-gray-300'}`}>
                <Link to="/" className="px-3 py-2 hover:text-primary transition-colors relative group">
                  Home
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                </Link>
                <Link to="/products" className="px-3 py-2 hover:text-primary transition-colors relative group">
                  Bikes
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                </Link>
                <Link to="/about" className="px-3 py-2 hover:text-primary transition-colors relative group">
                  About
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </div>
            </div> */}
             <div className="hidden md:block">
            <div  className={`ml-10 flex items-center space-x-6 ${isScrolled ? 'text-gray-950 ':'text-gray-300'}`}>
            <Link to="/" className=" py-2 hover:text-primary transition-colors relative group">
                  Home
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                </Link>
                <Link to="/products" className=" py-2 hover:text-primary transition-colors relative group">
                  Bikes
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                </Link>
                <Link to="/about" className=" py-2 hover:text-primary transition-colors relative group">
                  About
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                </Link>

              {/* User Icon or Sign In */}
              {token ? 
                       (
                            <div
                              className="relative"
                              ref={dropdownRef}
                              // onMouseEnter={() => setIsDropdownOpen(true)}
                            >
                              <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className=" font-medium hover:text-primary  py-2    "
                              >
                               <div className="flex gap-2 items-center justify-center">
                               <FaRegUserCircle />
                               <span> Mr Name</span>
                               </div>
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
                            </div> ): (
               <div className="flex gap-2"> 
               <Link to="/signin">
                <Button variant={"ghost"}>Login</Button>
              </Link>
             <Link to="/register">
               <Button className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 transition-all duration-300">Sign Up</Button>
             </Link>
             </div>
              )
              }

              {/* Dashboard Link (Visible Only When Logged In) */}

            </div>
          </div>
            
            {/* Right side actions */}
            {/* <div className="hidden md:flex items-center space-x-4">
              
              
              {user ? (
                <>
                  <Link to="/dashboard/wishlist" className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                    <Heart className="h-5 w-5" />
                  </Link>
                  
                  <Link to="/cart">
                    <div className="relative p-2 rounded-full hover:bg-gray-100 transition-colors">
                      <ShoppingCart className="h-5 w-5" />
                      {totalItems > 0 && (
                        <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                          {totalItems}
                        </span>
                      )}
                    </div>
                  </Link>
                  
                  <div className="relative group">
                    <Button variant="ghost" className="flex items-center space-x-2">
                      <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                        <User className="h-5 w-5 text-gray-600" />
                      </div>
                      <span className="hidden lg:inline">{user.name}</span>
                    </Button>
                    
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block animate-fade-in">
                      <Link 
                        to={isAdmin ? "/admin/dashboard" : "/dashboard"} 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Dashboard
                      </Link>
                      <Link 
                        to="/dashboard/profile" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Profile
                      </Link>
                      <button 
                        onClick={logout}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Logout
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="ghost">Login</Button>
                  </Link>
                  <Link to="/register">
                    <Button className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 transition-all duration-300">Sign Up</Button>
                  </Link>
                </>
              )}
            </div> */}

            </div>
           
            
            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-4">
           
              
              {token && (
                <CartSlide isScrolled={isScrolled} />
                
              )}
              
              <button
                onClick={toggleMenu}
                className={`inline-flex items-center justify-center p-2 rounded-md  focus:outline-none ${isScrolled ? 'text-black ':'text-gray-300'}`}
                
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6"  />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
        
        {/* Search Bar - conditionally rendered */}
    

        {/* Mobile menu */}
        <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} bg-white shadow-lg animate-slide-in-right`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block px-3 py-2 hover:bg-gray-100 rounded-md" onClick={closeMenu}>Home</Link>
            <Link to="/products" className="block px-3 py-2 hover:bg-gray-100 rounded-md" onClick={closeMenu}>Bikes</Link>
            <Link to="/about" className="block px-3 py-2 hover:bg-gray-100 rounded-md" onClick={closeMenu}>About</Link>
            
            {token ? (
              <>
                <Link 
                  to={"/dashboard"}
                  className="block px-3 py-2 hover:bg-gray-100 rounded-md" 
                  onClick={closeMenu}
                >
                  Dashboard
                </Link>
                <Link
                  to="/dashboard/profile"
                  className="block px-3 py-2 hover:bg-gray-100 rounded-md"
                  onClick={closeMenu}
                >
                  Profile
                </Link>
                <button 
                  onClick={() => { handleLogout(), closeMenu(); }}
                  className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-md flex items-center"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="block px-3 py-2 hover:bg-gray-100 rounded-md" onClick={closeMenu}>Login</Link>
                <Link to="/register" className="block px-3 py-2 hover:bg-gray-100 rounded-md" onClick={closeMenu}>Sign Up</Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
