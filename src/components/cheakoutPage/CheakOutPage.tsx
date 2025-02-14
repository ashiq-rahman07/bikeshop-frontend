import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";


const CheckoutPage = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-poppins font-bold text-center mb-8">Checkout</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-poppins font-semibold mb-4">Order Summary</h2>
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between border-b pb-4">
                  <div className="flex items-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="ml-4">
                      <h3 className="font-poppins font-semibold">{item.name}</h3>
                      <p className="text-gray-600">${item.price}</p>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="font-poppins font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t">
              <p className="font-poppins font-semibold text-right text-xl">
                Total: <span className="text-primary">${totalPrice.toFixed(2)}</span>
              </p>
            </div>
          </div>

          {/* Checkout Form */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-poppins font-semibold mb-4">Shipping & Payment Details</h2>
            <form className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  placeholder="johndoe@example.com"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <input
                  type="text"
                  placeholder="123 Main St"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* City */}
              <div>
                <label className="block text-sm font-medium text-gray-700">City</label>
                <input
                  type="text"
                  placeholder="New York"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Payment Details */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Payment Method</label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="credit_card">Credit Card</option>
                  <option value="paypal">PayPal</option>
                  <option value="cash_on_delivery">Cash on Delivery</option>
                </select>
              </div>

              {/* Card Details */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Card Number</label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Expiry & CVV */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">CVV</label>
                  <input
                    type="text"
                    placeholder="123"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors"
              >
                Place Order
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;