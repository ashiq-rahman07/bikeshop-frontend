import React, { useState } from 'react';
import { Order } from './OrderList';


interface OrderActionsProps {
  orderId: string;
  currentStatus: Order['status'];
  onUpdateStatus: (orderId: string, newStatus: Order['status']) => void;
  onDeleteOrder: (orderId: string) => void;
}

const OrderActions: React.FC<OrderActionsProps> = ({
  orderId,
  currentStatus,
  onUpdateStatus,
  onDeleteOrder,
}) => {
  const [newStatus, setNewStatus] = useState<Order['status']>(currentStatus);

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const status = e.target.value as Order['status'];
    setNewStatus(status);
    onUpdateStatus(orderId, status);
  };

  return (
    <div className="flex space-x-2">
      <select
        value={newStatus}
        onChange={handleStatusChange}
        className="px-2 py-1 border dark:bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
      >
        <option value="Pending">Pending</option>
        <option value="Processing">Processing</option>
        <option value="Shipped">Shipped</option>
        <option value="Delivered">Delivered</option>
        <option value="Cancelled">Cancelled</option>
      </select>
      <button
        onClick={() => onDeleteOrder(orderId)}
        className="px-2 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700"
      >
        Delete
      </button>
    </div>
  );
};

export default OrderActions;