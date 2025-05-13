
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { Address } from "@/types";

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, totalAmount, clearCart } = useCart();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<string>("credit-card");
  
  const [shippingAddress, setShippingAddress] = useState<Address>({
    fullName: user?.name || "",
    streetAddress: "",
    city: "",
    state: "",
    postalCode: "",
    country: "USA",
    phone: "",
  });
  
  const handleAddressChange = (field: keyof Address, value: string) => {
    setShippingAddress((prev) => ({
      ...prev,
      [field]: value
    }));
  };
  
  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    
    // Basic validation
    const requiredFields = Object.entries(shippingAddress);
    for (const [key, value] of requiredFields) {
      if (!value) {
        toast.error(`Please enter your ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
        return;
      }
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, you would send the order data to your backend
      
      // Clear cart after successful order
      clearCart();
      
      toast.success("Order placed successfully!");
      navigate("/dashboard/orders");
    } catch (error) {
      toast.error("Failed to place order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (cartItems.length === 0) {
    return (
      <div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h1 className="text-3xl font-bold mb-4">Checkout</h1>
          <p className="mb-6">Your cart is empty. Please add some products to your cart.</p>
          <Button onClick={() => navigate("/products")}>
            Browse Products
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="md:col-span-2">
            <form onSubmit={handlePlaceOrder}>
              {/* Shipping Information */}
              <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
                <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      value={shippingAddress.fullName}
                      onChange={(e) => handleAddressChange('fullName', e.target.value)}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={shippingAddress.phone}
                      onChange={(e) => handleAddressChange('phone', e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <Label htmlFor="streetAddress">Street Address</Label>
                    <Input
                      id="streetAddress"
                      value={shippingAddress.streetAddress}
                      onChange={(e) => handleAddressChange('streetAddress', e.target.value)}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={shippingAddress.city}
                      onChange={(e) => handleAddressChange('city', e.target.value)}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      value={shippingAddress.state}
                      onChange={(e) => handleAddressChange('state', e.target.value)}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="postalCode">Postal Code</Label>
                    <Input
                      id="postalCode"
                      value={shippingAddress.postalCode}
                      onChange={(e) => handleAddressChange('postalCode', e.target.value)}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      value={shippingAddress.country}
                      onChange={(e) => handleAddressChange('country', e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
              
              {/* Payment Method */}
              <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
                <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
                
                <RadioGroup 
                  value={paymentMethod} 
                  onValueChange={setPaymentMethod}
                  className="space-y-4"
                >
                  <div className="flex items-center space-x-2 border p-3 rounded-md">
                    <RadioGroupItem value="credit-card" id="credit-card" />
                    <Label htmlFor="credit-card" className="flex-1 cursor-pointer">
                      Credit Card
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2 border p-3 rounded-md">
                    <RadioGroupItem value="paypal" id="paypal" />
                    <Label htmlFor="paypal" className="flex-1 cursor-pointer">
                      PayPal
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2 border p-3 rounded-md">
                    <RadioGroupItem value="bank-transfer" id="bank-transfer" />
                    <Label htmlFor="bank-transfer" className="flex-1 cursor-pointer">
                      Bank Transfer
                    </Label>
                  </div>
                </RadioGroup>
                
                {paymentMethod === "credit-card" && (
                  <div className="mt-4 space-y-4">
                    <div>
                      <Label htmlFor="card-number">Card Number</Label>
                      <Input
                        id="card-number"
                        placeholder="1234 5678 9012 3456"
                        required={paymentMethod === "credit-card"}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry-date">Expiry Date</Label>
                        <Input
                          id="expiry-date"
                          placeholder="MM/YY"
                          required={paymentMethod === "credit-card"}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          placeholder="123"
                          required={paymentMethod === "credit-card"}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <Button 
                type="submit" 
                className="w-full"
                disabled={isSubmitting}
                size="lg"
              >
                {isSubmitting ? "Processing..." : "Place Order"}
              </Button>
            </form>
          </div>
          
          {/* Order Summary */}
          <div className="bg-gray-50 rounded-lg p-6 h-fit">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.product.id} className="flex py-2">
                  <div className="flex-shrink-0 w-16 h-16">
                    <img 
                      src={item.product.images[0]} 
                      alt={item.product.name} 
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                  
                  <div className="ml-4">
                    <div className="text-sm font-medium">{item.product.name}</div>
                    <div className="text-sm text-gray-500">Qty: {item.quantity}</div>
                    <div className="text-sm font-medium">
                      ${(item.product.price * item.quantity).toLocaleString()}
                    </div>
                  </div>
                </div>
              ))}
              
              <Separator />
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${totalAmount.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${(totalAmount * 0.08).toFixed(2)}</span>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>${(totalAmount * 1.08).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
