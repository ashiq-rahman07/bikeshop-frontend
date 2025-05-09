
import { useState, useEffect } from "react";
// import DashboardLayout from "@/components/dashboard/DashboardLayout";
// import StatCard from "@/components/dashboard/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ShoppingBag, 
  Users, 
  Package, 
  DollarSign, 
  TrendingUp,
  BarChart3,
  PieChart
} from "lucide-react";
import { orders } from "@/data/orders";
import { products } from "@/data/products";
import { users } from "@/data/users";
import { Order } from "@/types";
import DashboardLayout from "../newDashboard/DashboardLayout";
import StatCard from "../newDashboard/StatCard";

const AdminDashboard = () => {
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // In a real app, you would fetch data from your backend
        setRecentOrders(orders.slice(0, 5));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  // Calculate stats
  const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
  const pendingOrders = orders.filter(order => order.status === "pending").length;
  const processingOrders = orders.filter(order => order.status === "processing").length;
  const shippedOrders = orders.filter(order => order.status === "shipped").length;
  const deliveredOrders = orders.filter(order => order.status === "delivered").length;
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-gray-500">Welcome to your dashboard. Here's what's happening with your store today.</p>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Revenue"
            value={`$${totalRevenue.toLocaleString()}`}
            description="This month"
            icon={<DollarSign className="h-5 w-5" />}
            trend="up"
            trendValue="12%"
          />
          <StatCard
            title="Orders"
            value={orders.length}
            description="This month"
            icon={<ShoppingBag className="h-5 w-5" />}
            trend="up"
            trendValue="8%"
          />
          <StatCard
            title="Products"
            value={products.length}
            description="In inventory"
            icon={<Package className="h-5 w-5" />}
          />
          <StatCard
            title="Customers"
            value={users.filter(user => user.role === "customer").length}
            description="Total registered"
            icon={<Users className="h-5 w-5" />}
            trend="up"
            trendValue="5%"
          />
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="col-span-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle>Recent Orders</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-2">
                  {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className="h-12 bg-gray-100 animate-pulse rounded"></div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {recentOrders.map(order => (
                    <div key={order.id} className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Order #{order.id}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(order.orderDate).toLocaleDateString()} - {order.shippingAddress.fullName}
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
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle>Order Status</CardTitle>
              <PieChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="h-[200px] bg-gray-100 animate-pulse rounded"></div>
              ) : (
                <>
                  <div className="h-[200px] flex items-center justify-center">
                    <div className="relative w-40 h-40">
                      {/* Simple pie chart visualization */}
                      <div className="absolute inset-0 rounded-full overflow-hidden">
                        <div 
                          className="absolute bg-yellow-400" 
                          style={{ 
                            width: '100%', 
                            height: '100%', 
                            clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.cos(2 * Math.PI * pendingOrders / orders.length)}% ${50 - 50 * Math.sin(2 * Math.PI * pendingOrders / orders.length)}%, 50% 50%)` 
                          }}
                        ></div>
                        <div 
                          className="absolute bg-blue-400" 
                          style={{ 
                            width: '100%', 
                            height: '100%', 
                            clipPath: `polygon(50% 50%, ${50 + 50 * Math.cos(2 * Math.PI * pendingOrders / orders.length)}% ${50 - 50 * Math.sin(2 * Math.PI * pendingOrders / orders.length)}%, ${50 + 50 * Math.cos(2 * Math.PI * (pendingOrders + processingOrders) / orders.length)}% ${50 - 50 * Math.sin(2 * Math.PI * (pendingOrders + processingOrders) / orders.length)}%, 50% 50%)` 
                          }}
                        ></div>
                        <div 
                          className="absolute bg-purple-400" 
                          style={{ 
                            width: '100%', 
                            height: '100%', 
                            clipPath: `polygon(50% 50%, ${50 + 50 * Math.cos(2 * Math.PI * (pendingOrders + processingOrders) / orders.length)}% ${50 - 50 * Math.sin(2 * Math.PI * (pendingOrders + processingOrders) / orders.length)}%, ${50 + 50 * Math.cos(2 * Math.PI * (pendingOrders + processingOrders + shippedOrders) / orders.length)}% ${50 - 50 * Math.sin(2 * Math.PI * (pendingOrders + processingOrders + shippedOrders) / orders.length)}%, 50% 50%)` 
                          }}
                        ></div>
                        <div 
                          className="absolute bg-green-400" 
                          style={{ 
                            width: '100%', 
                            height: '100%', 
                            clipPath: `polygon(50% 50%, ${50 + 50 * Math.cos(2 * Math.PI * (pendingOrders + processingOrders + shippedOrders) / orders.length)}% ${50 - 50 * Math.sin(2 * Math.PI * (pendingOrders + processingOrders + shippedOrders) / orders.length)}%, ${50 + 50 * Math.cos(2 * Math.PI)}% ${50 - 50 * Math.sin(2 * Math.PI)}%, 50% 50%)` 
                          }}
                        ></div>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-20 h-20 bg-white rounded-full"></div>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-yellow-400 mr-2"></div>
                      <span className="text-sm">Pending ({pendingOrders})</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-blue-400 mr-2"></div>
                      <span className="text-sm">Processing ({processingOrders})</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-purple-400 mr-2"></div>
                      <span className="text-sm">Shipped ({shippedOrders})</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-green-400 mr-2"></div>
                      <span className="text-sm">Delivered ({deliveredOrders})</span>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="col-span-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle>Monthly Revenue</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="h-[200px] bg-gray-100 animate-pulse rounded"></div>
              ) : (
                <div className="h-[200px] flex items-end justify-between px-2">
                  {/* Simple bar chart visualization */}
                  {["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map((month, i) => (
                    <div key={month} className="flex flex-col items-center">
                      <div 
                        className="w-8 bg-primary rounded-t-md" 
                        style={{ height: `${50 + Math.random() * 100}px` }}
                      ></div>
                      <span className="text-xs mt-2">{month}</span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle>Top Products</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-2">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="h-10 bg-gray-100 animate-pulse rounded"></div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {products.slice(0, 4).map(product => (
                    <div key={product.id} className="flex justify-between">
                      <div className="text-sm font-medium truncate max-w-[70%]">{product.name}</div>
                      <div className="text-sm text-gray-500">{product.stock} in stock</div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
