import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  removeFromCart,
  updateQuantity,
} from '../../../redux/features/cart/cartSlice';
import { RootState } from '../../../redux/store';
import { BsCart3 } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
// import { toast } from "sonner";
// import { useCreateOrderMutation } from '../../../redux/features/order/order';

const CartSlide = ({isScrolled}) => {
  const navigate = useNavigate();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsCartOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  

  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (product: string) => {
    dispatch(removeFromCart(product));
  };
  const handleQuantityChange = (product: string, quantity: number) => {
    dispatch(updateQuantity({ product, quantity }));
  };
  const handleCheckout = () => {
    navigate('/cart');
    setIsCartOpen(false);
  };
  const totalPrice = cartItems.reduce(
    (total: number, item: { price: number; quantity: number }) =>
      total + item.price * item.quantity,
    0,
  );

  return (
    <div
      className="relative "
      ref={dropdownRef}
      // onMouseEnter={() => setIsCartOpen(true)}
      // onMouseLeave={() => setIsCartOpen(false)}
    >
      <button
        onClick={() => setIsCartOpen(!isCartOpen)}
        className={` dark:text-gray-200 hover:text-primary relative ${isScrolled ? 'text-black ':'text-gray-300'}`}
        
      >
        <span className="text-2xl">
          <BsCart3 className="w-6 h-6" />
        </span>
        {cartItems.length > 0 && (
          <span className="absolute top-0 right-0 bg-primary text-white text-xs rounded-full px-2 py-1 transform translate-x-1/2 -translate-y-1/2">
            {cartItems.reduce((total, item) => total + item.quantity, 0)}
          </span>
        )}
      </button>

      {/* Cart Slide-in Panel */}
      {isCartOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-200 border border-gray-200 dark:border-gray-800 rounded-lg shadow-lg z-50">
          <div className="p-4">
            <div className="flex justify-between items-center mb-4 ">
              <div>
                <h3 className="font-poppins font-semibold text-lg ">
                  Your Cart
                </h3>
                <p className="text-xs">
                  Review your items and proceed to checkout.
                </p>
              </div>
              <button onClick={() => setIsCartOpen(false)} className="text-2xl">
                X
              </button>
            </div>

            {cartItems.length === 0 ? (
              <p className="text-gray-900 dark:text-gray-200">
                Your cart is empty.
              </p>
            ) : (
              <div>
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div
                      key={item.product}
                      className="flex items-center justify-between"
                    >
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div className="flex-grow ml-4">
                        <h4 className="font-poppins font-semibold">
                          {item.name}
                        </h4>
                        <p className="text-gray-600">${item.price}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) =>
                            handleQuantityChange(
                              item.product,
                              parseInt(e.target.value),
                            )
                          }
                          className="w-12 p-1 border border-gray-300 dark:text-gray-900 rounded text-center"
                        />
                        <button
                          onClick={() => handleRemoveFromCart(item.product)}
                          className="text-red-600 hover:text-red-800"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="font-poppins font-semibold text-right">
                    Total: ${totalPrice.toFixed(2)}
                  </p>
                  <button
                    onClick={handleCheckout}
                    className="w-full mt-2 bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark"
                  >
                    Place Order
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CartSlide;
