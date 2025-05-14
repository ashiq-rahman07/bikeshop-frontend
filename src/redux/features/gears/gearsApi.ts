import { AddBikePayload } from '../../../types/alltypes';
import { TQueryParam, TResponseRedux } from '../../../types/global';
import { TBike } from '../../../types/product.type';
import { baseApi } from '../../api/baseApi';

const gearsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllGears: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: '/gear',
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
    getGearById: builder.query({
      query: (id) => {
        return {
          url: `/gear/${id}`,
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
    addGear: builder.mutation<TBike, AddBikePayload>({
      query: (bikeData) => ({
        url: '/gear/create-gear',
        method: 'POST',
        body: bikeData,
      }),
    }),
    updateGear: builder.mutation<
      TBike,
      { bikeId: string; bikeData: Partial<TBike> }
    >({
      query: ({ bikeId, bikeData }) => ({
        url: `/gear/${bikeId}`,
        method: 'PATCH',
        body: bikeData,
      }),
    }),
    deleteGear: builder.mutation<void, string>({
      query: (bikeId) => ({
        url: `/gear/${bikeId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetAllGearsQuery,
  useGetGearByIdQuery,
  useDeleteGearMutation,
  useUpdateGearMutation,
  useAddGearMutation,
} = gearsApi;
