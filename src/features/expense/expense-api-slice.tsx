import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import Settings from '@Config/settings';
export interface ExpensesProps {
  limit?: number;
  offset?: number;
}

export const expenseSliceApi = createApi({
  reducerPath: 'expense-api',
  baseQuery: fetchBaseQuery({
    baseUrl: Settings.uri,
    prepareHeaders(headers) {
      return headers;
    },
  }),
  endpoints: build => ({
    fetchExpenses: build.query<void, any>({
      query: ({limit = 25, offset = 25}: ExpensesProps) =>
        `/expenses?limit=${limit}&offset=${offset}`,
    }),
    updateExpense: build.mutation({
      query: ({id, comment}) => ({
        url: `/expenses/${id}`,
        method: 'POST',
        body: {comment},
      }),
    }),
    updateWithReceipt: build.mutation({
      query: ({id, res}) => {
        return {
          url: `/expenses/${id}/receipts`,
          headers: {
            'content-type': 'multipart/form-data',
          },
          method: 'POST',
          body: res,
        };
      },
    }),
  }),
});

export const {
  useFetchExpensesQuery,
  useLazyFetchExpensesQuery,
  useUpdateExpenseMutation,
  useUpdateWithReceiptMutation,
} = expenseSliceApi;
