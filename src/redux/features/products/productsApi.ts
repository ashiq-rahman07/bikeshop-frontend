import { TQueryParam, TResponseRedux } from "../../../types/global";
import {  TBike} from "../../../types/product.type";
import { baseApi } from "../../api/baseApi";

const productsApi = baseApi.injectEndpoints({
    endpoints:(builder)=>({
        getAllProducts: builder.query({
            query: (args) => {
                const params = new URLSearchParams();

                if (args) {
                  args.forEach((item: TQueryParam) => {
                    params.append(item.name, item.value as string);
                  });
                }
        
                return {
                  url: '/product',
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
                    url: `/product/${id}`,
                    method: 'GET',
                   
                  }
            },
            transformResponse: (response: TResponseRedux<TBike>) => {
                return {
                  data: response.data,
                  meta: response.meta,
                };
              },
          })
    })
})



export const {useGetAllProductsQuery, useGetProductByIdQuery}= productsApi;