
import { ReactNode, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  User, 
  ShoppingBag, 
  Heart, 
  Settings, 
  LogOut,
  Package,
  Users,
  LayoutDashboard,
  Tag, 
  Menu,
  X,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/context/AuthContext";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useGetSingleUserQuery } from "@/redux/features/user/authApi";
import { TUser } from "@/types/alltypes";
import { logout } from "@/redux/features/user/authSlice";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [isAdmin,setIsAdmin] = useState(false)
  const navigate = useNavigate()
  // const { user, logout, isAdmin } = useAuth();
  const user = useAppSelector((state) => state.auth.user);
  // console.log(user);
  useEffect(() => {
    if (user?.role === "admin") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [user]);
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // console.log(user);

  const { data, isLoading, isError, refetch }=  useGetSingleUserQuery(user.userId)
  
  const userData = data?.data
  const dispatch = useAppDispatch();
    const handleLogout = () => {
      dispatch(logout());
      navigate('/')
    };
  // const { data, isLoading, isError, refetch }=  useGetSingleUserQuery(user.userId)

  // Define menu items based on user role
   const menuItems = isAdmin
    ? [
        { name: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" },
        { name: "Bikes Management", icon: Package, path: "/admin/bikes-management" },
        { name: "Add Bike", icon: Package, path: "/admin/add-bike" },
        { name: "Gears Management", icon: Package, path: "/admin/gears-management" },
        { name: "Add Gears", icon: Package, path: "/admin/add-gears" },
        { name: "Orders Management", icon: ShoppingBag, path: "/admin/orders-management" },
        { name: "Customers Management", icon: Users, path: "/admin/customers-management" },
        { name: "Settings", icon: Settings, path: "/admin/settings" }
      ]
    : [
        { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
        { name: "Orders", icon: ShoppingBag, path: "/dashboard/orders" },
        { name: "Wishlist", icon: Heart, path: "/dashboard/wishlist" },
        { name: "Profile", icon: User, path: "/dashboard/profile" },
        { name: "Settings", icon: Settings, path: "/dashboard/settings" }
      ];
  
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-gray-100">
    {/* Mobile header */}
    <div className="md:hidden bg-white shadow-sm p-4 flex justify-between items-center">
      <Link to="/" className="flex items-center">
        <span className="text-xl font-bold">ClassicRider</span>
      </Link>
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleMobileMenu}
      >
        {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>
    </div>
    
    {/* Mobile menu */}
    {isMobileMenuOpen && (
      <div className="md:hidden bg-white shadow-sm">
        <div className="p-4">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
              <User className="h-5 w-5" />
            </div>
            <div>
              <p className="font-medium">{userData?.name}</p>
              <p className="font-medium">Role: {user.role}</p>
              <p className="text-sm text-gray-500">{userData?.email}</p>
            </div>
          </div>
          
          <Separator className="my-4" />
          
          <nav className="space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center px-3 py-2 rounded-md text-sm ${
                  location.pathname === item.path
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <item.icon className="h-4 w-4 mr-3" />
                {item.name}
                <ChevronRight className="h-4 w-4 ml-auto" />
              </Link>
            ))}
            
            <button
              onClick={handleLogout}
              className="w-full flex items-center px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100"
            >
              <LogOut className="h-4 w-4 mr-3" />
              Logout
            </button>
          </nav>
        </div>
      </div>
    )}
    
    <div className="flex flex-col md:flex-row">
      {/* Sidebar (desktop only) */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex flex-col flex-grow bg-white shadow-sm overflow-y-auto">
          <div className="p-4 border-b">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold">ClassicRider</span>
            </Link>
          </div>
          
          <div className="p-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                <User className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium">{userData?.name}</p>
                <p className="font-sm text-gray-500">Role: {user.role}</p>
                <p className="text-sm text-gray-500">{userData?.email}</p>
              </div>
            </div>
            
            <Separator className="my-4" />
            
            <nav className="space-y-1">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center px-3 py-2 rounded-md ${
                    location.pathname === item.path
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.name}
                </Link>
              ))}
              
              <button
                onClick={handleLogout}
                className="w-full flex items-center px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
              >
                <LogOut className="h-5 w-5 mr-3" />
                Logout
              </button>
            </nav>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="md:ml-64 flex-1">
        <main className="p-4 sm:p-6 md:p-8">{children}</main>
      </div>
    </div>
  </div>
  );
};

export default DashboardLayout;
