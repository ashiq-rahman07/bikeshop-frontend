
import { Link } from "react-router-dom";
import { 
  Bell, 
  ChevronDown,
  LayoutDashboard,
  LogOut, 
  Search,
  Settings,
  User,
  Menu,
  X
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

interface DashboardHeaderProps {
  toggleMobileMenu: () => void;
  isMobileMenuOpen: boolean;
}

const DashboardHeader = ({ toggleMobileMenu, isMobileMenuOpen }: DashboardHeaderProps) => {
  const { user, logout, isAdmin } = useAuth();

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
      {/* Mobile header */}
      <div className="md:hidden bg-card shadow-md p-4 flex justify-between items-center border-b border-border/40">
        <Link to="/" className="flex items-center">
          <span className="text-xl font-bold text-primary">VelocityVibe</span>
        </Link>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      </div>
      
      {/* Desktop header */}
      <header className="dashboard-header px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Search bar */}
          <div className="relative w-full max-w-xs hidden md:flex items-center">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              type="search" 
              placeholder="Search..." 
              className="pl-9 h-9 bg-muted/50 border-muted focus:bg-muted/80"
            />
          </div>
          
          {/* Right side actions */}
          <div className="flex items-center space-x-3">
            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    3
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80 dark-glass">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="max-h-96 overflow-auto">
                  {[1, 2, 3].map((i) => (
                    <DropdownMenuItem key={i} className="cursor-pointer p-4 flex flex-col items-start gap-1 hover:bg-accent focus:bg-accent">
                      <div className="font-medium">New order received</div>
                      <div className="text-sm text-muted-foreground">Order #{i}000 has been placed</div>
                      <div className="text-xs text-muted-foreground/70 mt-1">5 minutes ago</div>
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
                    {user?.name}
                  </span>
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="dark-glass">
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
                <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
    </>
  );
};

export default DashboardHeader;