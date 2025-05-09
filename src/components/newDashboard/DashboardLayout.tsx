
import { ReactNode, useState } from "react";
import { Link, useLocation } from "react-router-dom";
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

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { user, logout, isAdmin } = useAuth();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Define menu items based on user role
  const menuItems = isAdmin
    ? [
        { name: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" },
        { name: "Products", icon: Package, path: "/admin/products" },
        { name: "Orders", icon: ShoppingBag, path: "/admin/orders" },
        { name: "Customers", icon: Users, path: "/admin/customers" },
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
          <span className="text-xl font-bold">VelocityVibe</span>
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
                <p className="font-medium">{user?.name}</p>
                <p className="text-sm text-gray-500">{user?.email}</p>
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
                onClick={logout}
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
                <span className="text-xl font-bold">VelocityVibe</span>
              </Link>
            </div>
            
            <div className="p-4">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">{user?.name}</p>
                  <p className="text-sm text-gray-500">{user?.email}</p>
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
                  onClick={logout}
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
