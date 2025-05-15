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
  ChevronRight,
  Bell,
  Search,
  ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useGetSingleUserQuery } from "@/redux/features/user/authApi";
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
        { name: "My Orders", icon: ShoppingBag, path: "/dashboard/orders" },
        { name: "My Wishlist", icon: Heart, path: "/dashboard/wishlist" },
        { name: "Profile", icon: User, path: "/dashboard/profile" },
        { name: "Settings", icon: Settings, path: "/dashboard/settings" }
      ];
  
    // Get user initials for avatar
  const getUserInitials = () => {
    if (!userData?.name) return "U";
    return userData.name.split(" ").map((n: any[]) => n[0]).join("").toUpperCase();
  };
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };


  return (
    <div className="min-h-screen bg-gray-50">
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
              <Avatar>
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {getUserInitials()}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{userData?.name}</p>
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
                <span className="text-xl font-bold">VelocityVibe</span>
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
                  <p className="font-medium">{userData?.name}</p>
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
        <div className="md:ml-64 flex-1 flex flex-col">
          {/* Top Navigation */}
          <header className="bg-white shadow-sm border-b px-4 sm:px-6 py-3">
            <div className="flex items-center justify-between">
              {/* Search bar */}
              <div className="relative w-full max-w-xs hidden md:flex items-center">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input 
                  type="search" 
                  placeholder="Search..." 
                  className="pl-9 h-9 bg-gray-50 border-gray-200 focus:bg-white"
                />
              </div>
              
              {/* Right side actions */}
              <div className="flex items-center space-x-3">
                {/* Notifications */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative">
                      <Bell className="h-5 w-5" />
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        3
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-80">
                    <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <div className="max-h-96 overflow-auto">
                      {[1, 2, 3].map((i) => (
                        <DropdownMenuItem key={i} className="cursor-pointer p-4 flex flex-col items-start gap-1">
                          <div className="font-medium">New order received</div>
                          <div className="text-sm text-gray-500">Order #{i}000 has been placed</div>
                          <div className="text-xs text-gray-400 mt-1">5 minutes ago</div>
                        </DropdownMenuItem>
                      ))}
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer justify-center font-medium text-primary">
                      View all notifications
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                {/* User menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                          {getUserInitials()}
                        </AvatarFallback>
                      </Avatar>
                      <span className="hidden lg:inline-block font-medium truncate max-w-[100px]">
                        {userData?.name}
                      </span>
                      <ChevronDown className="h-4 w-4 text-gray-500" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to={isAdmin ? "/admin/dashboard" : "/dashboard"}>
                        <LayoutDashboard className="h-4 w-4 mr-2" />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard/profile">
                        <User className="h-4 w-4 mr-2" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard/settings">
                        <Settings className="h-4 w-4 mr-2" />
                        Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </header>
          
          {/* Page content */}
          <main className="flex-1 p-4 sm:p-6 md:p-8">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
