
import { CheckCircle, Circle, Truck, Package, Clock } from "lucide-react";

interface OrderTrackerProps {
  status: "pending" | "processing" | "shipped" | "delivered";
}

const OrderTracker = ({ status }: OrderTrackerProps) => {
  const steps = [
    { name: "Pending", icon: Clock, status: "pending" },
    { name: "Processing", icon: Package, status: "processing" },
    { name: "Shipped", icon: Truck, status: "shipped" },
    { name: "Delivered", icon: CheckCircle, status: "delivered" },
  ];
  
  // Determine active step index
  const activeIndex = steps.findIndex(step => step.status === status);
  
  return (
    <div className="w-full py-4">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.name} className="flex flex-col items-center">
            <div className={`
              w-10 h-10 rounded-full flex items-center justify-center
              ${index <= activeIndex 
                ? "bg-primary text-white" 
                : "bg-gray-200 text-gray-500"}
            `}>
              <step.icon className="h-5 w-5" />
            </div>
            <span className="mt-2 text-xs text-center">{step.name}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 relative">
        <div className="h-1 w-full bg-gray-200 absolute"></div>
        <div 
          className="h-1 bg-primary absolute" 
          style={{ 
            width: `${
              activeIndex === 0 ? 0 : 
              activeIndex === 1 ? 33.3 : 
              activeIndex === 2 ? 66.6 : 
              100
            }%` 
          }}
        ></div>
      </div>
    </div>
  );
};

export default OrderTracker;
