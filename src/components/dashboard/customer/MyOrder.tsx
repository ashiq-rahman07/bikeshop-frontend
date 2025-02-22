// pages/dashboard/Orders.tsx

import { Link } from 'react-router-dom';
import { useGetOrdersByUserQuery } from '../../../redux/features/order/order';
import { selectCurrentUser } from '../../../redux/features/user/authSlice';
import { useAppSelector } from '../../../redux/hooks';

import Loading from '../../ui/Loading';

const MyOrder = () => {
  const user = useAppSelector(selectCurrentUser);
  const userId = user?.userId as string;
  const { isLoading, data, isError } = useGetOrdersByUserQuery(userId, {
    refetchOnMountOrArgChange: true,
  });
  const orderData = data?.data;

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <div>Error loading orders</div>;
  }

  return (
    <div className="bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      <h1 className="text-2xl font-poppins font-bold py-6 text-center">
        My Orders
      </h1>

      <div className="overflow-x-auto dark:bg-gray-800">
        <table className="min-w-full bg-white dark:dark:bg-gray-900">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-900">
              <th className="py-2 px-4 border-b text-left">Order ID</th>
              <th className="py-2 px-4 border-b text-left">Date</th>
              <th className="py-2 px-4 border-b text-left">Status</th>
              <th className="py-2 px-4 border-b text-left">Total</th>
              <th className="py-2 px-4 border-b text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {orderData?.map((order) => (
              <tr key={order._id} className="bg-gray-100 dark:bg-gray-900">
                <td className="py-2 px-4 border-b">{order._id}</td>
                <td className="py-2 px-4 border-b">{order.createdAt}</td>
                <td className="py-2 px-4 border-b">
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      order.status === 'Completed'
                        ? 'bg-green-100 text-green-700'
                        : order.status === 'Pending'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="py-2 px-4 border-b">
                  ${order.totalPrice.toFixed(2)}
                </td>
                <td className="py-2 px-4 border-b">
                  <Link
                    to={`/order/verify?order_id=${order.transaction.id}`}
                    className="text-primary hover:text-primary-dark"
                  >
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrder;
