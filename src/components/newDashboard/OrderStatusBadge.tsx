
import { Badge } from "@/components/ui/badge";

interface OrderStatusBadgeProps {
  status: "pending" | "processing" | "shipped" | "delivered";
}

const OrderStatusBadge = ({ status }: OrderStatusBadgeProps) => {
  switch (status) {
    case "pending":
      return (
        <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-yellow-200">
          Pending
        </Badge>
      );
    case "processing":
      return (
        <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-200">
          Processing
        </Badge>
      );
    case "shipped":
      return (
        <Badge variant="outline" className="bg-purple-100 text-purple-800 hover:bg-purple-100 border-purple-200">
          Shipped
        </Badge>
      );
    case "delivered":
      return (
        <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100 border-green-200">
          Delivered
        </Badge>
      );
    default:
      return null;
  }
};

export default OrderStatusBadge;
