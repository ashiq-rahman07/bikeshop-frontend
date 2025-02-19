// pages/dashboard/Orders.tsx

import { Link } from 'react-router-dom';
import { useGetOrdersByUserQuery } from '../../../redux/features/order/order';
import { selectCurrentUser } from '../../../redux/features/user/authSlice';
import { useAppSelector } from '../../../redux/hooks';
import { Order } from '../../order/Order';
import Loading from '../../ui/Loading';

const MyOrder = () => {
  const user = useAppSelector(selectCurrentUser);
  const userId = user?.userId;
  const { isLoading, data, isError } = useGetOrdersByUserQuery(userId, {
    refetchOnMountOrArgChange: true,
  });
  const orderData: Order[] = data?.data;

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <div>Error loading orders</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-poppins font-bold mb-6">My Orders</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-left">Order ID</th>
              <th className="py-2 px-4 border-b text-left">Date</th>
              <th className="py-2 px-4 border-b text-left">Status</th>
              <th className="py-2 px-4 border-b text-left">Total</th>
              <th className="py-2 px-4 border-b text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {orderData?.map((order) => (
              <tr key={order._id} className="hover:bg-gray-50">
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
