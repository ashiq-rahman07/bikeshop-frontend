import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { removeFromCart, updateQuantity } from "../../redux/features/cart/cartSlice";


const Cart = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const handleQuantityChange = (id: number, quantity: number) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-poppins font-bold text-center my-8">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty.</p>
      ) : (
        <div>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover" />
                <div>
                  <h3 className="font-poppins font-semibold">{item.name}</h3>
                  <p className="text-gray-600">${item.price}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                    className="w-16 p-2 border border-gray-300 rounded-lg"
                  />
                  <button
                    onClick={() => handleRemoveFromCart(item.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-right">
            <p className="text-xl font-poppins font-bold">Total: ${totalPrice.toFixed(2)}</p>
            <button className="mt-4 bg-primary text-white px-6 py-2 rounded hover:bg-primary-dark">
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;