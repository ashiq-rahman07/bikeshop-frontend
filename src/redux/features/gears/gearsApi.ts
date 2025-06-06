import { IGear } from './../../../types/gear';


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
      transformResponse: (response: TResponseRedux<IGear[]>) => {
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
    addGear: builder.mutation({
      query: (gearData) => ({
        url: '/gear/create-gear',
        method: 'POST',
        body: gearData,
      }),
    }),
    updateGear: builder.mutation({
      query: ({ gearId, formData }) => ({
        url: `/gear/${gearId}`,
        method: 'PATCH',
        body: formData,
      }),
    }),
    deleteGear: builder.mutation({
      query: (gearId) => ({
        url: `/gear/${gearId}`,
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
