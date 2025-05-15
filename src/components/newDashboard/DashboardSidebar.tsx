
import { ReactNode } from "react";
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
  ChevronRight
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

interface SidebarProps {
  isMobileMenuOpen?: boolean;
  toggleMobileMenu?: () => void;
}

const DashboardSidebar = ({ isMobileMenuOpen, toggleMobileMenu }: SidebarProps) => {
  const { user, logout, isAdmin } = useAuth();
  const location = useLocation();
  
  // Define menu items based on user role
  const menuItems = isAdmin
    ? [
        { name: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" },
        { name: "Bikes", icon: Package, path: "/admin/bikes" },
        { name: "Gear", icon: Package, path: "/admin/gear" },
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
  
  const handleLogout = () => {
    logout();
    toast.success("You've been logged out successfully");
  };

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user?.name) return "U";
    return user.name.split(" ").map(n => n[0]).join("").toUpperCase();
  };
  
  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex flex-col flex-grow dashboard-sidebar overflow-y-auto">
          <div className="p-4 border-b border-sidebar-border">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-primary">VelocityVibe</span>
            </Link>
          </div>
          
          <div className="p-4">
            <div className="flex items-center space-x-3 mb-4">
              <Avatar>
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {getUserInitials()}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{user?.name}</p>
                <p className="text-sm text-sidebar-foreground/70">{user?.email}</p>
              </div>
            </div>
            
            <Separator className="my-4 bg-sidebar-border" />
            
            <nav className="space-y-1">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`dashboard-nav-item ${
                    location.pathname === item.path
                      ? "dashboard-nav-item-active"
                      : "dashboard-nav-item-inactive"
                  }`}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.name}
                </Link>
              ))}
              
              <button
                onClick={handleLogout}
                className="w-full flex items-center px-3 py-2 rounded-md text-sidebar-foreground/80 hover:bg-sidebar-accent/70 hover:text-destructive"
              >
                <LogOut className="h-5 w-5 mr-3" />
                Logout
              </button>
            </nav>
          </div>
        </div>
      </div>
      
      {/* Mobile menu - Conditionally rendered */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-card shadow-md border-b border-border/40">
          <div className="p-4">
            <div className="flex items-center space-x-3 mb-4">
              <Avatar>
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {getUserInitials()}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{user?.name}</p>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
              </div>
            </div>
            
            <Separator className="my-4 bg-border/40" />
            
            <nav className="space-y-1">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center px-3 py-2 rounded-md text-sm ${
                    location.pathname === item.path
                      ? "bg-accent text-accent-foreground font-medium"
                      : "text-foreground/80 hover:bg-accent/50"
                  }`}
                  onClick={toggleMobileMenu}
                >
                  <item.icon className="h-4 w-4 mr-3" />
                  {item.name}
                  <ChevronRight className="h-4 w-4 ml-auto" />
                </Link>
              ))}
              
              <button
                onClick={handleLogout}
                className="w-full flex items-center px-3 py-2 rounded-md text-sm text-destructive hover:bg-accent/50"
              >
                <LogOut className="h-4 w-4 mr-3" />
                Logout
              </button>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardSidebar;