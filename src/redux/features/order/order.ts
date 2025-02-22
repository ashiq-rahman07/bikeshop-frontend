import { IOrder } from '../../../types/order/orderType';
import { baseApi } from '../../api/baseApi';

// Define interfaces for your data structures
interface OrderInfo {
  // Define the structure of the order information
  id: string;
  userId: string;
  items: Array<{
    productId: string;
    quantity: number;
  }>;
  totalPrice: number;
  // Add other fields as necessary
}

interface Order {
  id: string;
  userId: string;
  items: Array<{
    productId: string;
    quantity: number;
  }>;
  totalPrice: number;
  status: string;
  // Add other fields as necessary
}

interface IOrderResponse {
  status:boolean;
  message:string;
  data:IOrder[]
}

interface VerifyOrderResponse {
  isValid: boolean;
  message?: string;
}


const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation<Order, OrderInfo>({
      query: (orderInfo) => ({
        url: '/orders/create-order',
        method: 'POST',
        body: orderInfo,
      }),
    }),
    getOrders: builder.query<IOrderResponse, void>({
      query: () => '/orders',
    }),
    getOrdersByUser: builder.query<IOrder[], string>({
      query: (userId) => `/orders/${userId}`,
    }),
    verifyOrder: builder.query({
      query: (order_id) => ({
        url: '/orders/verify',
        params: { order_id },
        method: 'GET',
      }),
    }),
       updateOrderStatus: builder.mutation< IOrderResponse,{ orderId: string; status:string}>({
          query: ({ orderId, status }) => ({
            url: `/orders/status/${orderId}`,
            method: 'PATCH',
            body: {status},
          }),
          // invalidatesTags: (result, error, { id }) => [{ type: 'User', id }]
        }),
    
        deleteOrder: builder.mutation<void, string>({
          query: (orderId) => ({
            url: `/orders/${orderId}`,
            method: 'DELETE',
          }),
        }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrdersQuery,
  useGetOrdersByUserQuery,
  useVerifyOrderQuery,
  useUpdateOrderStatusMutation,
  useDeleteOrderMutation
} = orderApi;



