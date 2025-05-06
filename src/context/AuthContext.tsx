
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { toast } from "sonner";

import { users } from "../data/users";
import { User } from "@/types";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => false,
  register: async () => false,
  logout: () => {},
  isLoading: true,
  isAdmin: false,
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  useEffect(() => {
    // Check local storage for user data
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing stored user data:", error);
        localStorage.removeItem("user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulate API request delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, you would validate with a backend API
      const foundUser = users.find(u => u.email === email);
      
      if (foundUser && password === "password") { // Just for demo, always use "password" as the password
        setUser(foundUser);
        localStorage.setItem("user", JSON.stringify(foundUser));
        toast.success(`Welcome back, ${foundUser.name}!`);
        return true;
      } else {
        toast.error("Invalid email or password");
        return false;
      }
    } catch (error) {
      toast.error("Login failed. Please try again.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulate API request delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user already exists
      const existingUser = users.find(u => u.email === email);
      
      if (existingUser) {
        toast.error("Email already registered");
        return false;
      }
      
      // In a real app, you would create the user in your backend
      const newUser: User = {
        id: `user-${Date.now()}`,
        name,
        email,
        role: "customer",
      };
      
      // For demo purposes, we'll just set the user state
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
      toast.success(`Account created successfully! Welcome, ${name}!`);
      return true;
    } catch (error) {
      toast.error("Registration failed. Please try again.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    toast.success("Logged out successfully");
  };

  const isAdmin = user?.role === "admin";

  const value = {
    user,
    login,
    register,
    logout,
    isLoading,
    isAdmin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
