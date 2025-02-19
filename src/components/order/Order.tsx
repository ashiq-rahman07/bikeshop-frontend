import { Link } from 'react-router-dom';
import { useGetOrdersByUserQuery } from '../../redux/features/order/order';
import { selectCurrentUser } from '../../redux/features/user/authSlice';
import { useAppSelector } from '../../redux/hooks';
import Loading from '../ui/Loading';

export interface Transaction {
  id: string;
  transactionStatus: string | null;
  bank_status: string;
  date_time: string;
  method: string;
  sp_code: string;
  sp_message: string;
}

export interface Product {
  product: string;
  quantity: number;
  _id: string;
}

export interface Order {
  transaction: Transaction;
  _id: string;
  user: string;
  products: Product[];
  totalPrice: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
const Order = () => {
  const user = useAppSelector(selectCurrentUser);
  const userId = user?.userId;
  console.log(userId);
  const { isLoading, data } = useGetOrdersByUserQuery(userId, {
    refetchOnMountOrArgChange: true,
  });
  const orderData: Order[] = data?.data;
  if (orderData.length === 0) {
    <p className="text-md">
      You Have not Order Yet,{' '}
      <Link to="/product" className="text-blue-600">
        Macke A Order
      </Link>
    </p>;
  }
  console.log(orderData);
  return isLoading ? (
    <Loading />
  ) : (
    <div className="min-h-screen bg-gray-100 text-gray-900 dark:text-gray-100 dark:bg-gray-700 py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-poppins font-bold text-center mb-8">
          Order Details
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Details */}

          {orderData?.map((order, index) => (
            <div
              key={index}
              className="flex justify-between items-center border-b bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-6 rounded-lg shadow-md pb-2"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <p>Order Date: {new Date(order?.createdAt).toLocaleString()}</p>
                <p>
                  Last Updated: {new Date(order?.updatedAt).toLocaleString()}
                </p>
                <h3 className="font-semibold">Order Summary</h3>
                <p>Total Price: ${order?.totalPrice?.toFixed(2)}</p>

                <div className="">
                  <h3 className="font-semibold">Products</h3>
                  <ul>
                    {order?.products?.map((product, i) => (
                      <li key={i}>
                        Product ID: {product?.product}, Quantity:{' '}
                        {product?.quantity}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="">
                  <h3 className="font-semibold">Transaction Details</h3>
                  <p>Transaction ID: {order?.transaction?.id}</p>
                  <p>Payment Method: {order?.transaction?.method}</p>
                  <p>Transaction Date: {order?.transaction?.date_time}</p>
                  <p>Transaction Status: {order?.transaction?.bank_status}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Order;
