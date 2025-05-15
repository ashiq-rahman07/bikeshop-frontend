
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { AlertCircle, ChevronLeft, ShoppingBag } from "lucide-react";

const PaymentCanceled = () => {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <div className="h-24 w-24 rounded-full bg-red-100 mx-auto flex items-center justify-center mb-8">
          <AlertCircle className="h-12 w-12 text-red-600" />
        </div>
        
        <h1 className="text-3xl font-bold mb-4">Payment Not Completed</h1>
        <p className="text-xl text-gray-600 mb-8">
          Your payment was canceled or could not be processed.
        </p>
        
        <div className="bg-gray-50 p-6 rounded-lg mb-8">
          <h2 className="text-lg font-semibold mb-2">Need Help?</h2>
          <p className="text-gray-600">
            If you encountered an issue during checkout, our support team is here to help.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
            <Link to="/checkout">
              <Button variant="outline" size="lg">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Return to Checkout
              </Button>
            </Link>
            <Link to="/cart">
              <Button size="lg">
                <ShoppingBag className="mr-2 h-5 w-5" />
                View Cart
              </Button>
            </Link>
          </div>
        </div>

        <div className="mt-8 text-gray-500">
          <p>
            Common payment issues:
          </p>
          <ul className="list-disc text-left max-w-md mx-auto mt-2 space-y-1">
            <li>Insufficient funds</li>
            <li>Incorrect card information</li>
            <li>Bank declined the transaction</li>
            <li>Network connectivity issues</li>
          </ul>
          <p className="mt-4">
            Need assistance?{" "}
            <Link to="/contact" className="text-primary hover:underline">
              Contact our support team
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default PaymentCanceled;