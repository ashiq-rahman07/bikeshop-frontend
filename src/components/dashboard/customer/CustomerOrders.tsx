import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ShoppingBag, ChevronDown, ChevronUp } from "lucide-react";
import { orders } from "@/data/orders";
import { useAuth } from "@/context/AuthContext";
import { Order } from "@/types";
import DashboardLayout from "@/components/newDashboard/DashboardLayout";
import OrderStatusBadge from "@/components/newDashboard/OrderStatusBadge";
import OrderTracker from "../OrderTracker";

const CustomerOrders = () => {
  const { user } = useAuth();
  const [userOrders, setUserOrders] = useState<Order[]>([]);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
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
  
  const toggleOrderExpand = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">My Orders</h1>
          <Link to="/products">
            <Button>
              <ShoppingBag className="mr-2 h-4 w-4" />
              Shop More
            </Button>
          </Link>
        </div>
        
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-32 bg-gray-100 animate-pulse rounded-lg"></div>
            ))}
          </div>
        ) : userOrders.length > 0 ? (
          <div className="space-y-4">
            {userOrders.map(order => (
              <div key={order.id} className="bg-white rounded-lg shadow overflow-hidden">
                <div 
                  className="p-4 flex justify-between items-center cursor-pointer"
                  onClick={() => toggleOrderExpand(order.id)}
                >
                  <div>
                    <div className="flex items-center">
                      <h3 className="font-semibold">Order #{order.id}</h3>
                      <span className="ml-4">
                        <OrderStatusBadge status={order.status} />
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      Placed on {new Date(order.orderDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="font-semibold">${order.totalAmount.toLocaleString()}</span>
                    {expandedOrder === order.id ? (
                      <ChevronUp className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    )}
                  </div>
                </div>
                
                {expandedOrder === order.id && (
                  <div className="p-4 bg-gray-50 border-t">
                    <OrderTracker status={order.status} />
                    
                    <Separator className="my-4" />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium mb-2">Shipping Information</h4>
                        <p className="text-sm">{order.shippingAddress.fullName}</p>
                        <p className="text-sm">{order.shippingAddress.streetAddress}</p>
                        <p className="text-sm">
                          {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}
                        </p>
                        <p className="text-sm">{order.shippingAddress.country}</p>
                        <p className="text-sm">{order.shippingAddress.phone}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">Order Details</h4>
                        <p className="text-sm">
                          <span className="font-medium">Payment Method:</span> {order.paymentMethod}
                        </p>
                        {order.estimatedDeliveryDate && (
                          <p className="text-sm">
                            <span className="font-medium">Estimated Delivery:</span>{" "}
                            {new Date(order.estimatedDeliveryDate).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <Separator className="my-4" />
                    
                    <h4 className="font-medium mb-2">Items</h4>
                    <div className="space-y-3">
                      {order.items.map(item => (
                        <div key={item.product.id} className="flex items-center">
                          <div className="w-16 h-16 flex-shrink-0">
                            <img 
                              src={item.product.images[0]} 
                              alt={item.product.name} 
                              className="w-full h-full object-cover rounded"
                            />
                          </div>
                          <div className="ml-4">
                            <Link to={`/products/${item.product.id}`} className="font-medium hover:text-primary">
                              {item.product.name}
                            </Link>
                            <p className="text-sm text-gray-500">
                              {item.product.brand} | Qty: {item.quantity}
                            </p>
                          </div>
                          <div className="ml-auto font-medium">
                            ${(item.product.price * item.quantity).toLocaleString()}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-6 border-t border-gray-200 pt-4 flex justify-between">
                      <Button variant="outline">Contact Support</Button>
                      <div className="text-right">
                        <p className="text-sm">Total</p>
                        <p className="text-xl font-bold">${order.totalAmount.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <ShoppingBag className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium">No orders yet</h3>
            <p className="mt-2 text-gray-500">When you place your first order, it will appear here.</p>
            <Link to="/products" className="mt-4 inline-block">
              <Button>Start Shopping</Button>
            </Link>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default CustomerOrders;