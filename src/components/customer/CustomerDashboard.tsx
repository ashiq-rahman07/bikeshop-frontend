
import { useEffect, useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingBag, Heart, Clock, Calendar } from "lucide-react";
import { orders } from "@/data/orders";
import { useAuth } from "@/context/AuthContext";
import { Order } from "@/types";
import DashboardLayout from "../newDashboard/DashboardLayout";
import StatCard from "../newDashboard/StatCard";

const CustomerDashboard = () => {
  const { user } = useAuth();
  const [userOrders, setUserOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        if (user) {
          // In a real app, you would fetch orders from your backend
          // For demo purposes, we'll filter the mock orders by user ID
          const filteredOrders = orders.filter(order => order.userId === user.id);
          setUserOrders(filteredOrders);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchOrders();
  }, [user]);
  
  // Get stats from orders
  const totalOrders = userOrders.length;
  const totalSpent = userOrders.reduce((sum, order) => sum + order.totalAmount, 0);
  const pendingOrders = userOrders.filter(order => 
    order.status === "pending" || order.status === "processing"
  ).length;
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-500">Welcome back, {user?.name}!</p>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Orders"
            value={totalOrders}
            description="All time orders"
            icon={<ShoppingBag className="h-5 w-5" />}
          />
          <StatCard
            title="Total Spent"
            value={`$${totalSpent.toLocaleString()}`}
            description="All time spending"
            icon={<Clock className="h-5 w-5" />}
          />
          <StatCard
            title="Pending Orders"
            value={pendingOrders}
            description="Awaiting delivery"
            icon={<Calendar className="h-5 w-5" />}
          />
          <StatCard
            title="Wishlist Items"
            value="5"
            description="Items saved for later"
            icon={<Heart className="h-5 w-5" />}
          />
        </div>
        
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-2">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="h-12 bg-gray-100 animate-pulse rounded"></div>
                  ))}
                </div>
              ) : userOrders.length > 0 ? (
                <div className="space-y-4">
                  {userOrders.slice(0, 5).map(order => (
                    <div key={order.id} className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Order #{order.id}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(order.orderDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <p className="font-medium text-right mr-4">${order.totalAmount.toLocaleString()}</p>
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            order.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                            order.status === "processing" ? "bg-blue-100 text-blue-800" :
                            order.status === "shipped" ? "bg-purple-100 text-purple-800" :
                            "bg-green-100 text-green-800"
                          }`}
                        >
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center py-4 text-gray-500">No orders found</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CustomerDashboard;
