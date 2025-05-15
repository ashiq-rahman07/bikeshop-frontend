
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Check, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const { clearCart, cartItems } = useCart();
  
  // Check if there was an actual order and clear the cart
  useEffect(() => {
    // This would typically verify the order with your backend
    // Here we're just clearing the cart after successful payment
    clearCart();
  }, [clearCart]);

  return (
   
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <div className="h-24 w-24 rounded-full bg-green-100 mx-auto flex items-center justify-center mb-8">
          <Check className="h-12 w-12 text-green-600" />
        </div>
        
        <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
        <p className="text-xl text-gray-600 mb-8">
          Thank you for your purchase. Your order has been confirmed.
        </p>
        
        <div className="bg-gray-50 p-6 rounded-lg mb-8">
          <h2 className="text-lg font-semibold mb-2">What's Next?</h2>
          <p className="text-gray-600 mb-4">
            We're processing your order now. You'll receive an email confirmation shortly with order details and tracking information.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
            <Link to="/dashboard/orders">
              <Button variant="outline" size="lg">
                View My Orders
              </Button>
            </Link>
            <Link to="/products">
              <Button size="lg">
                <ShoppingBag className="mr-2 h-5 w-5" />
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>

        <div className="mt-8 text-gray-500">
          <p>
            Have questions about your order?{" "}
            <Link to="/contact" className="text-primary hover:underline">
              Contact our support team
            </Link>
          </p>
        </div>
      </div>
   
  );
};

export default PaymentSuccess;