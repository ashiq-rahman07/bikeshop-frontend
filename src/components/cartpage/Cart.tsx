/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import {
  removeAllCart,
  removeFromCart,
  updateQuantity,
} from '../../redux/features/cart/cartSlice';
import { toast } from 'sonner';
import { useEffect } from 'react';
import { useCreateOrderMutation } from '../../redux/features/order/order';
import { useAppSelector } from '../../redux/hooks';
import { useCurrentToken } from '../../redux/features/user/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import Loading from '../ui/Loading';
import { FaLongArrowAltRight } from 'react-icons/fa';

const Cart = () => {
  const token = useAppSelector(useCurrentToken);
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
  // console.log(useCreateOrderMutation());
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
      toast.success(data?.message, { id: toastId });

      dispatch(removeAllCart());

      if (data?.data) {
        setTimeout(() => {
          window.location.href = data.data;
        }, 500);
      }
    }

    if (isError) toast.error(JSON.stringify(error), { id: toastId });
  }, [data?.data, data?.message, error, isError, isLoading, isSuccess]);
  // [data?.data, data?.message, error, isError, isLoading, isSuccess]

  return isLoading ? (
    <Loading />
  ) : (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-poppins font-bold text-center my-8">
        Your Cart
      </h1>
      {cartItems.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty.</p>
      ) : (
        <div>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.product}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-20 h-20 object-cover"
                />
                <div>
                  <h3 className="font-poppins font-semibold">{item.name}</h3>
                  <p className="text-gray-600">${item.price}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(
                        item.product,
                        parseInt(e.target.value),
                      )
                    }
                    className="w-16 p-2 border border-gray-300 rounded-lg"
                  />
                  <button
                    onClick={() => handleRemoveFromCart(item.product)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-right">
            <p className="text-xl font-poppins font-bold">
              Total: ${totalPrice.toFixed(2)}
            </p>
            <div className="flex justify-between">
              <Link
                to="/products"
                className=" flex  items-center justify-center hover:text-primary"
              >
                <span>Continue Shopping</span>{' '}
                <FaLongArrowAltRight className="pt-2 text-xl" />
              </Link>
              <button
                onClick={handlePlaceOrder}
                className="mt-4 bg-primary text-white px-6 py-2 rounded hover:bg-primary-dark"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
