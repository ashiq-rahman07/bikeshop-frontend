
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { User, Shield, Key, MapPin, Camera } from "lucide-react";
import DashboardLayout from "../newDashboard/DashboardLayout";

const CustomerProfile = () => {
  const { user } = useAuth();
  
  const [profileForm, setProfileForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "555-123-4567",
  });
  
  const [addressForm, setAddressForm] = useState({
    street: "123 Main St",
    city: "Anytown",
    state: "CA",
    zipCode: "12345",
    country: "USA",
  });
  
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [isUpdatingAddress, setIsUpdatingAddress] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileForm({
      ...profileForm,
      [e.target.name]: e.target.value,
    });
  };
  
  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddressForm({
      ...addressForm,
      [e.target.name]: e.target.value,
    });
  };
  
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordForm({
      ...passwordForm,
      [e.target.name]: e.target.value,
    });
  };
  
  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdatingProfile(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, you would update the user profile in your backend
      toast.success("Profile information updated successfully");
    } catch (error) {
      toast.error("Failed to update profile information");
    } finally {
      setIsUpdatingProfile(false);
    }
  };
  
  const handleAddressSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdatingAddress(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, you would update the user address in your backend
      toast.success("Address updated successfully");
    } catch (error) {
      toast.error("Failed to update address");
    } finally {
      setIsUpdatingAddress(false);
    }
  };
  
  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }
    
    if (passwordForm.newPassword.length < 6) {
      toast.error("New password must be at least 6 characters long");
      return;
    }
    
    setIsUpdatingPassword(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, you would update the user password in your backend
      toast.success("Password changed successfully");
      
      // Clear password fields
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      toast.error("Failed to change password");
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">My Profile</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Summary Card */}
          <div>
            <Card className="bg-white/80 backdrop-blur-sm border shadow-sm hover:shadow-md transition-all duration-300">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center">
                  <div className="relative">
                    <div className="h-24 w-24 rounded-full bg-gradient-to-br from-primary to-secondary p-1">
                      <div className="h-full w-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                        <User className="h-12 w-12 text-gray-400" />
                      </div>
                    </div>
                    <button className="absolute bottom-0 right-0 h-8 w-8 bg-white rounded-full border shadow-sm flex items-center justify-center hover:bg-gray-50">
                      <Camera className="h-4 w-4" />
                    </button>
                  </div>
                  
                  <h2 className="mt-4 text-xl font-semibold">{profileForm.name}</h2>
                  <p className="text-gray-500">{profileForm.email}</p>
                  
                  <div className="mt-6 w-full space-y-2">
                    <div className="flex justify-between p-3 bg-gray-50 rounded-md">
                      <span className="text-gray-500">Member Since</span>
                      <span className="font-medium">May 2023</span>
                    </div>
                    <div className="flex justify-between p-3 bg-gray-50 rounded-md">
                      <span className="text-gray-500">Orders</span>
                      <span className="font-medium">12</span>
                    </div>
                    <div className="flex justify-between p-3 bg-gray-50 rounded-md">
                      <span className="text-gray-500">Wishlist</span>
                      <span className="font-medium">5 items</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        
          {/* Profile Details Cards */}
          <div className="md:col-span-2">
            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="personal" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>Personal Info</span>
                </TabsTrigger>
                <TabsTrigger value="address" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>Address</span>
                </TabsTrigger>
                <TabsTrigger value="security" className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  <span>Security</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="personal" className="mt-0">
                <Card className="bg-white/80 backdrop-blur-sm border shadow-sm hover:shadow-md transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <User className="mr-2 h-5 w-5 text-primary" />
                      Personal Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleProfileSubmit}>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            name="name"
                            value={profileForm.name}
                            onChange={handleProfileChange}
                            className="mt-1"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={profileForm.email}
                            onChange={handleProfileChange}
                            className="mt-1"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            name="phone"
                            value={profileForm.phone}
                            onChange={handleProfileChange}
                            className="mt-1"
                          />
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <Button 
                          type="submit" 
                          disabled={isUpdatingProfile}
                          className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 transition-all duration-300"
                        >
                          {isUpdatingProfile ? "Updating..." : "Update Profile"}
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="address" className="mt-0">
                <Card className="bg-white/80 backdrop-blur-sm border shadow-sm hover:shadow-md transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <MapPin className="mr-2 h-5 w-5 text-primary" />
                      Address Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleAddressSubmit}>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="street">Street Address</Label>
                          <Input
                            id="street"
                            name="street"
                            value={addressForm.street}
                            onChange={handleAddressChange}
                            className="mt-1"
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="city">City</Label>
                            <Input
                              id="city"
                              name="city"
                              value={addressForm.city}
                              onChange={handleAddressChange}
                              className="mt-1"
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor="state">State / Province</Label>
                            <Input
                              id="state"
                              name="state"
                              value={addressForm.state}
                              onChange={handleAddressChange}
                              className="mt-1"
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="zipCode">ZIP / Postal Code</Label>
                            <Input
                              id="zipCode"
                              name="zipCode"
                              value={addressForm.zipCode}
                              onChange={handleAddressChange}
                              className="mt-1"
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor="country">Country</Label>
                            <Input
                              id="country"
                              name="country"
                              value={addressForm.country}
                              onChange={handleAddressChange}
                              className="mt-1"
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <Button 
                          type="submit" 
                          disabled={isUpdatingAddress}
                          className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 transition-all duration-300"
                        >
                          {isUpdatingAddress ? "Updating..." : "Update Address"}
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="security" className="mt-0">
                <Card className="bg-white/80 backdrop-blur-sm border shadow-sm hover:shadow-md transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Key className="mr-2 h-5 w-5 text-primary" />
                      Password Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handlePasswordSubmit}>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="currentPassword">Current Password</Label>
                          <Input
                            id="currentPassword"
                            name="currentPassword"
                            type="password"
                            value={passwordForm.currentPassword}
                            onChange={handlePasswordChange}
                            className="mt-1"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="newPassword">New Password</Label>
                          <Input
                            id="newPassword"
                            name="newPassword"
                            type="password"
                            value={passwordForm.newPassword}
                            onChange={handlePasswordChange}
                            className="mt-1"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="confirmPassword">Confirm New Password</Label>
                          <Input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            value={passwordForm.confirmPassword}
                            onChange={handlePasswordChange}
                            className="mt-1"
                          />
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <Button 
                          type="submit" 
                          disabled={isUpdatingPassword}
                          className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 transition-all duration-300"
                        >
                          {isUpdatingPassword ? "Updating..." : "Change Password"}
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CustomerProfile;
