
import { Link, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { 
  Trash2,
  ShoppingCart,
  ArrowRight 
} from "lucide-react";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser, useCurrentToken } from "@/redux/features/user/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { removeAllCart, removeFromCart, updateQuantity } from "@/redux/features/cart/cartSlice";
import { useCreateOrderMutation } from "@/redux/features/order/order";
import { toast } from "sonner";
import { useEffect } from "react";


const CartPage = () => {
   const token = useAppSelector(useCurrentToken);
  
   const user  = useAppSelector(selectCurrentUser);
   const cartItems = useSelector((state: RootState) => state.cart.items);
 
   const dispatch = useDispatch();
   const navigate = useNavigate();
 
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
 
   const handlePlaceOrder = async () => {
     try {
       if (!token) {
         navigate('/signin');
       }
 
       await createOrder({ products: cartItems });
     } catch (error: any) {
       toast.error(error.message);
     }
   };
 
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
  
  return (
    
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
        
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 bg-gray-50 rounded-lg">
            <ShoppingCart className="h-16 w-16 text-gray-400 mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Looks like you haven't added any items to your cart yet.</p>
            <Link to="/products">
              <Button>Start Shopping</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="md:col-span-2">
              {cartItems.map((item) => (
                <div key={item.product} className="flex items-center py-6 border-b">
                  <div className="flex-shrink-0 w-24 h-24">
                    <img 
                       src={item.imageUrl}
                    alt={item.name} 
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                  
                  <div className="flex-grow ml-4">
                    <Link to={`/${item?.routes}/${item?.product}`} className="text-lg font-medium hover:text-primary">
                      {item.name}
                    </Link>
                    <div className="text-sm text-gray-600">
                      {item.brand} | {item.category}
                      
                    </div>
                    <div className="text-lg font-semibold mt-1">
                      ${item.price.toLocaleString()}
                    </div>
                  </div>
                  
                  <div className="flex items-center ml-4">
                    <select
                      value={item.quantity}
                     onChange={(e) =>
                        handleQuantityChange(
                          item.product,
                          parseInt(e.target.value),
                        )
                      }
                      className="block w-20 py-1 px-2 border rounded-md"
                    >
                      {Array.from({ length: Math.min(10, item.productStock) }, (_, i) => i + 1).map((num) => (
                        <option key={num} value={num}>
                          {num}
                        </option>
                      ))}
                    </select>
                    
                    <button 
                      onClick={() => handleRemoveFromCart(item.product)}
                      className="ml-4 text-gray-500 hover:text-red-500"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Order Summary */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              
              <div className="space-y-4">
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
                
                <Separator />
                
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>${(totalPrice * 1.08).toFixed(2)}</span>
                </div>
                
                <div className="pt-4">
                  <Link to={user ? "/checkout" : "/login?redirect=checkout"}>
                    <Button className="w-full">
                      Proceed to Checkout
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
                
                <div className="mt-4">
                  <h3 className="font-medium mb-2">Have a promo code?</h3>
                  <div className="flex">
                    <Input 
                      placeholder="Enter promo code" 
                      className="rounded-r-none"
                    />
                    <Button variant="outline" className="rounded-l-none">Apply</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
   
  );
};

export default CartPage;