import { IOrder } from '../../../types/order/orderType';
import { baseApi } from '../../api/baseApi';

// Define interfaces for your data structures
export interface IOrderCart {
    productId: string;
    productName: string;
    productImg: string;
    price: number;
    quantity: number;
    productType: string;
}

interface OrderInfo {
  
  products: IOrderCart[];
  totalPrice: number;
  shippingAddress: {
    name: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
   orderDate?: Date; // Optional, will default to current time

}


interface IOrderResponse {
  status: boolean;
  message: string;
  data: IOrder[];
}
interface CreateResponse {
  status: boolean;
  message: string;
  data: string;
}


const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (orderInfo) => ({
        url: '/orders/create-order',
        method: 'POST',
        body: orderInfo,
      }),
    }),
    getOrders: builder.query<IOrderResponse, void>({
      query: () => '/orders',
    }),
    getOrdersByUser: builder.query<IOrderResponse, string>({
      query: (userId) => `/orders/${userId}`,
    }),
    verifyOrder: builder.query({
      query: (order_id) => ({
        url: '/orders/verify',
        params: { order_id },
        method: 'GET',
      }),
    }),
    updateOrderStatus: builder.mutation<
      IOrderResponse,
      { orderId: string; status: string }
    >({
      query: ({ orderId, status }) => ({
        url: `/orders/status/${orderId}`,
        method: 'PATCH',
        body: { status },
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
  useDeleteOrderMutation,
} = orderApi;
