import React from 'react';
import OrderActions from './OrderActions';

export interface Order {
  id: string;
  customerName: string;
  orderDate: string;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  totalAmount: number;
}

interface OrderListProps {
  orders: Order[];
  onUpdateStatus: (orderId: string, newStatus: Order['status']) => void;
  onDeleteOrder: (orderId: string) => void;
}

const OrderList: React.FC<OrderListProps> = ({
  orders,
  onUpdateStatus,
  onDeleteOrder,
}) => {
  return (
    <div className="overflow-x-auto dark:bg-gray-900 dark:text-gray-100">
      <div className="text-center py-4">
        <h2 className="text-2xl font-semibold">Order Mangement</h2>
        <p className="text-sm py-2">Update Order Status Or, Delete Order</p>
      </div>
      <table className="min-w-full text-center   border-b border-gray-400 dark:border-gray-700">
        <thead>
          <tr className="">
            <th className="py-2 px-4 border-b">Order ID</th>
            <th className="py-2 px-4 border-b">Customer Name</th>
            <th className="py-2 px-4 border-b">Order Date</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Total Amount</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr
              key={order.id}
              className="hover:bg-gray-50 hover:dark:bg-gray-700"
            >
              <td className="py-2 px-4 border-b">{order.id}</td>
              <td className="py-2 px-4 border-b">{order.customerName}</td>
              <td className="py-2 px-4 border-b">
                {new Date(order.orderDate).toLocaleDateString()}
              </td>
              <td className="py-2 px-4 border-b">
                <span
                  className={`px-2 py-1 text-sm rounded-full ${
                    order.status === 'Pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : order.status === 'Processing'
                        ? 'bg-blue-100 text-blue-800'
                        : order.status === 'Shipped'
                          ? 'bg-green-100 text-green-800'
                          : order.status === 'Delivered'
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-red-100 text-red-800'
                  }`}
                >
                  {order.status}
                </span>
              </td>
              <td className="py-2 px-4 border-b">
                ${order.totalAmount.toFixed(2)}
              </td>
              <td className="py-2 px-4 border-b">
                <OrderActions
                  orderId={order.id}
                  currentStatus={order.status}
                  onUpdateStatus={onUpdateStatus}
                  onDeleteOrder={onDeleteOrder}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderList;
