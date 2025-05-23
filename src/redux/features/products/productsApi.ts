import { IBike } from './../../../../../bikeshop-server/src/app/modules/bikes/bike.interface';
import { AddBikePayload } from '../../../types/alltypes';
import { TQueryParam, TResponseRedux } from '../../../types/global';
import { TBike } from '../../../types/product.type';
import { baseApi } from '../../api/baseApi';

const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: '/bike',
          method: 'GET',
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TBike[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    getProductById: builder.query({
      query: (id) => {
        return {
          url: `/bike/${id}`,
          method: 'GET',
        };
      },
      transformResponse: (response: TResponseRedux<TBike>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    addProduct: builder.mutation({
      query: (bikeData) => ({
        url: '/bike/create-bike',
        method: 'POST',
        body: bikeData,
      }),
    }),
    updateProduct: builder.mutation({
      query: ({ bikeId, formData }) => ({
        url: `/bike/${bikeId}`,
        method: 'PATCH',
        body: formData,
      }),
    }),
    deleteBike: builder.mutation({
      query: (bikeId) => ({
        url: `/bike/${bikeId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useDeleteBikeMutation,
  useUpdateProductMutation,
  useAddProductMutation,
} = productsApi;
