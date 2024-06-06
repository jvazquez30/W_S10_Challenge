import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const pizzaApi = createApi({
    reducerPath: 'pizzaApi',
    baseQuery: fetchBaseQuery({ baseUrl: `http://localhost:9009/api/pizza/`}),
    tagTypes: ["Pizza"],
    endpoints: builder => ({
        getOrders: builder.query({
            query: () => "history",
            providesTags: ["Pizza"]
           
        }),
        createPizza: builder.mutation({
            query: (pizza) => ({
                url: 'order',
                method: "POST",
                body: pizza,
            }),
            invalidatesTags: ["Pizza"]
        })
    })
})

export const {
    useGetOrdersQuery, useCreatePizzaMutation
} = pizzaApi