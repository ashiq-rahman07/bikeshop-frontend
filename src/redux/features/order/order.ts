import { TResponse, TResponseRedux } from '../../../types/global';
import { IOrder } from '../../../types/order/orderType';
import { baseApi } from '../../api/baseApi';

// Define interfaces for your data structures
interface OrderInfo {
  // Define the structure of the order information
products:Cart[]
  

  // Add other fields as necessary
}


interface Cart {
  product: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

interface IOrderResponse {
  status:boolean;
  message:string;
  data:IOrder[]
}
interface CreateResponse {
  status:boolean;
  message:string;
  data:string
}



const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) =>({
    createOrder: builder.mutation <CreateResponse ,OrderInfo>({
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



