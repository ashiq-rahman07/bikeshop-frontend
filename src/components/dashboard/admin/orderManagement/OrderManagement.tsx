// import { useState } from "react";
// import OrderList, { Order } from "./OrderList";



import React from 'react';
import { useDeleteOrderMutation, useGetOrdersQuery, useUpdateOrderStatusMutation } from '../../../../redux/features/order/order';
import { IOrder } from '../../../../types/order/orderType';
import { toast } from 'react-toastify';
// import { useGetOrdersQuery, useUpdateOrderStatusMutation, useDeleteOrderMutation } from '../features/orders/ordersApi';

const OrderManagementPage: React.FC = () => {
  // Fetch orders
  const { data, isLoading, isError,refetch, } = useGetOrdersQuery();
  const ordersData = data?.data
  console.log(ordersData?.length);

  // Update order status
  const [updateOrderStatus] = useUpdateOrderStatusMutation();

  // Delete order
  const [deleteOrder] = useDeleteOrderMutation();

  // Handle status update
  const handleUpdateStatus = async (id: string, newStatus:IOrder['status']) => {
    try {
      await updateOrderStatus({ orderId:id, status: newStatus }).unwrap();
      toast.success('Order Status Updating... ')
      refetch();
    } catch (error) {
      console.error('Failed to update order status:', error);
    }
  };

  // Handle order deletion
  const handleDeleteOrder = async (orderId: string) => {
    try {
      alert('Confirm To Delete This Order')
      await deleteOrder(orderId).unwrap();
      toast.success("Order Deleted....")
      refetch()
    } catch (error) {
      console.error('Failed to delete .order:', error);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading orders.</div>;

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 dark:text-gray-100 min-h-screen">
      <div className="container overflow-x-auto mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Order Management</h1>
          <p className='text-xl font-semibold'>Total Orders: {ordersData?.length}</p>
        </div>

        {/* Orders Table */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="py-3 px-4 text-left">Order ID</th>
                <th className="py-3 px-4 text-left">Customer Name</th>
                <th className="py-3 px-4 text-left">Order Date</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Total Amount</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {ordersData?.map((order) => (
                <tr key={order.id} className="border-b border-gray-600">
                  <td className="py-3 px-4">{order.id}</td>
                  <td className="py-3 px-4">{order.user}</td>
                  <td className="py-3 px-4">{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td className="py-3 px-4">
                    <select
                      value={order.status}
                      onChange={(e) => handleUpdateStatus(order.id, e.target.value as IOrder['status'])}
                      className={`px-2 py-1 text-sm rounded-full ${
                        order.status === 'Pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : order.status === 'Shipped'
                          ? 'bg-green-100 text-green-800'
                          : order.status === 'Completed'
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="py-3 px-4">${order.totalPrice
.toFixed(2)}</td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleDeleteOrder(order.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderManagementPage;
// const OrderManagement = () => {
//   const [orders, setOrders] = useState<Order[]>([
//     {
//       id: '1',
//       customerName: 'John Doe',
//       orderDate: '2025-02-14T18:20:34.843Z',
//       status: 'Pending',
//       totalAmount: 120.5,
//     },
//     {
//       id: '2',
//       customerName: 'Jane Smith',
//       orderDate: '2025-02-15T10:15:00.000Z',
//       status: 'Processing',
//       totalAmount: 99.99,
//     },
//   ]);

//   const handleUpdateStatus = (orderId: string, newStatus: Order['status']) => {
//     setOrders((prevOrders) =>
//       prevOrders.map((order) =>
//         order.id === orderId ? { ...order, status: newStatus } : order
//       )
//     );
//   };

//   const handleDeleteOrder = (orderId: string) => {
//     setOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderId));
//   };

//   return <div className="dark:bg-gray-900 dark:text-gray-100 ">
//     <OrderList   orders={orders}
//         onUpdateStatus={handleUpdateStatus}
//         onDeleteOrder={handleDeleteOrder}/>
//   </div>;
// };

// export default OrderManagement;
