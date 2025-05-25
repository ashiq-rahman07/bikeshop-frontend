import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { Address } from "@/types";
import { useDispatch, useSelector } from "react-redux";
import { ICartItem, removeAllCart, removeFromCart, updateQuantity } from "@/redux/features/cart/cartSlice";
import { IOrderCart, useCreateOrderMutation } from "@/redux/features/order/order";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { selectCurrentUser, useCurrentToken } from "@/redux/features/user/authSlice";


const CheckOut = () => {
  const [orderData,setOrderData] = useState<IOrderCart[]>(null);
  const navigate = useNavigate();
   const token = useAppSelector(useCurrentToken);
  
   const user  = useAppSelector(selectCurrentUser);
   const cartItems = useSelector((state: RootState) => state.cart.items);
 console.log(cartItems)
   const dispatch = useDispatch();

 useEffect(() => {
   if (cartItems.length === 0) {
     setOrderData([]);
   } else {
     const orderData = cartItems.map((item: ICartItem) => ({
       productId: item.productId,
       productName: item.productName,
       productImg: item.productImg,
       quantity: item.quantity,
       productType: item.productType,
       price: item.price,
     }));
     setOrderData(orderData);
   }
 },[cartItems])
   const handleRemoveFromCart = (product: string) => {
     dispatch(removeFromCart(product));
   };
 
   const handleQuantityChange = (product: string, quantity: number) => {
     dispatch(updateQuantity({ product, quantity }));
   };
 
   const totalPrice = cartItems.reduce(
     (total, item) => total + item.price * item.quantity,
     0,
   );
 
   const [createOrder, { isLoading, isSuccess, data, isError, error }] =
     useCreateOrderMutation();
 
 
 
   const toastId = 'cart';
 
   useEffect(() => {
     if (isLoading && token) toast.loading('Processing ...', { id: toastId });
 
     if (isSuccess) {
       toast.success(data?.status, { id: toastId });
 
       dispatch(removeAllCart());
 
       if (data?.data) {
         setTimeout(() => {
           window.location.href = data.data;
         }, 500);
       }
     }
 
     if (isError) toast.error(JSON.stringify(error), { id: toastId });
   }, [data?.data, data?.message, error, isError, isLoading, isSuccess]);
  const [isSubmitting, setIsSubmitting] = useState(false);
//   const [paymentMethod, setPaymentMethod] = useState<string>("credit-card");
  
  const [shippingAddress, setShippingAddress] = useState<Address>({
    fullName:  "",
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
    const orderInfo = {
     
      products:orderData,
      totalPrice: totalPrice,
      shippingAddress: shippingAddress,
      orderDate: new Date().toISOString(),
      
    }
    
    try {
      // Simulate API call delay
        if (!token) {
         navigate('/signin');
       }
 
       await createOrder(orderInfo);
      removeAllCart();
      
      toast.success("Order placed successfully!");
  
    } catch (error) {
      toast.error("Failed to place order. Please try again.");
      navigate("/payment-canceled");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cartItems.length === 0) {
    return (
     
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h1 className="text-3xl font-bold mb-4">Checkout</h1>
          <p className="mb-6">Your cart is empty. Please add some products to your cart.</p>
          <Button onClick={() => navigate("/products")}>
            Browse Products
          </Button>
        </div>
      
    );
  }

  return (
    
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
                    <Select
                      value={shippingAddress.state}
                      onValueChange={(value) => handleAddressChange('state', value)}
                    >
                      <SelectTrigger id="state">
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="AL">Alabama</SelectItem>
                        <SelectItem value="AK">Alaska</SelectItem>
                        <SelectItem value="AZ">Arizona</SelectItem>
                        <SelectItem value="AR">Arkansas</SelectItem>
                        <SelectItem value="CA">California</SelectItem>
                        <SelectItem value="CO">Colorado</SelectItem>
                        <SelectItem value="CT">Connecticut</SelectItem>
                        <SelectItem value="DE">Delaware</SelectItem>
                        <SelectItem value="FL">Florida</SelectItem>
                        <SelectItem value="GA">Georgia</SelectItem>
                        <SelectItem value="HI">Hawaii</SelectItem>
                        <SelectItem value="ID">Idaho</SelectItem>
                        <SelectItem value="IL">Illinois</SelectItem>
                        <SelectItem value="IN">Indiana</SelectItem>
                        <SelectItem value="IA">Iowa</SelectItem>
                        <SelectItem value="KS">Kansas</SelectItem>
                        <SelectItem value="KY">Kentucky</SelectItem>
                        <SelectItem value="LA">Louisiana</SelectItem>
                        <SelectItem value="ME">Maine</SelectItem>
                        <SelectItem value="MD">Maryland</SelectItem>
                        <SelectItem value="MA">Massachusetts</SelectItem>
                        <SelectItem value="MI">Michigan</SelectItem>
                        <SelectItem value="MN">Minnesota</SelectItem>
                        <SelectItem value="MS">Mississippi</SelectItem>
                        <SelectItem value="MO">Missouri</SelectItem>
                        <SelectItem value="MT">Montana</SelectItem>
                        <SelectItem value="NE">Nebraska</SelectItem>
                        <SelectItem value="NV">Nevada</SelectItem>
                        <SelectItem value="NH">New Hampshire</SelectItem>
                        <SelectItem value="NJ">New Jersey</SelectItem>
                        <SelectItem value="NM">New Mexico</SelectItem>
                        <SelectItem value="NY">New York</SelectItem>
                        <SelectItem value="NC">North Carolina</SelectItem>
                        <SelectItem value="ND">North Dakota</SelectItem>
                        <SelectItem value="OH">Ohio</SelectItem>
                        <SelectItem value="OK">Oklahoma</SelectItem>
                        <SelectItem value="OR">Oregon</SelectItem>
                        <SelectItem value="PA">Pennsylvania</SelectItem>
                        <SelectItem value="RI">Rhode Island</SelectItem>
                        <SelectItem value="SC">South Carolina</SelectItem>
                        <SelectItem value="SD">South Dakota</SelectItem>
                        <SelectItem value="TN">Tennessee</SelectItem>
                        <SelectItem value="TX">Texas</SelectItem>
                        <SelectItem value="UT">Utah</SelectItem>
                        <SelectItem value="VT">Vermont</SelectItem>
                        <SelectItem value="VA">Virginia</SelectItem>
                        <SelectItem value="WA">Washington</SelectItem>
                        <SelectItem value="WV">West Virginia</SelectItem>
                        <SelectItem value="WI">Wisconsin</SelectItem>
                        <SelectItem value="WY">Wyoming</SelectItem>
                        <SelectItem value="DC">District of Columbia</SelectItem>
                      </SelectContent>
                    </Select>
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
                    <Select
                      value={shippingAddress.country}
                      onValueChange={(value) => handleAddressChange('country', value)}
                    >
                      <SelectTrigger id="country">
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USA">United States</SelectItem>
                        <SelectItem value="CAN">Canada</SelectItem>
                        <SelectItem value="MEX">Mexico</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              
              {/* Payment Method */}
              <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
                <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
                <RadioGroup value="cash-on-delivery" className="space-y-4">
                  <div className="flex items-center space-x-2 border p-3 rounded-md">
                    <RadioGroupItem value="cash-on-delivery" id="cash-on-delivery" disabled />
                    <Label htmlFor="cash-on-delivery" className="flex-1 cursor-pointer">
                      Cash on Delivery
                    </Label>
                  </div>
                </RadioGroup>
                <div className="text-xs text-gray-500 mt-2">Currently, only Cash on Delivery is supported.</div>
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
              {cartItems.map((item:ICartItem,) => (
                <div key={item.productId} className="flex py-2">
                  <div className="flex-shrink-0 w-16 h-16">
                    <img 
                      src={item.productName} 
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                
                  <div className="ml-4">
                    <div className="text-sm font-medium">{item.productName}</div>
                    <div className="text-sm text-gray-500">Qty: {item.quantity}</div>
                    <div className="text-sm font-medium">
                      ${(item.price * item.quantity).toLocaleString()}
                    </div>
                  </div>
                </div>
              ))}
              
              <Separator />
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${totalPrice.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${(totalPrice * 0.08).toFixed(2)}</span>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>${(totalPrice * 1.08).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
   
  );
};

export default CheckOut;