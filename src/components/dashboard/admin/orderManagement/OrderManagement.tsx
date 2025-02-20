import { useState } from "react";
import OrderList, { Order } from "./OrderList";

const OrderManagement = () => {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: '1',
      customerName: 'John Doe',
      orderDate: '2025-02-14T18:20:34.843Z',
      status: 'Pending',
      totalAmount: 120.5,
    },
    {
      id: '2',
      customerName: 'Jane Smith',
      orderDate: '2025-02-15T10:15:00.000Z',
      status: 'Processing',
      totalAmount: 99.99,
    },
  ]);

  const handleUpdateStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const handleDeleteOrder = (orderId: string) => {
    setOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderId));
  };

  return <div>
    <OrderList   orders={orders}
        onUpdateStatus={handleUpdateStatus}
        onDeleteOrder={handleDeleteOrder}/>
  </div>;
};

export default OrderManagement;
