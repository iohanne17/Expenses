import {configureStore} from '@reduxjs/toolkit';
import {expenseSliceApi} from '@Features/expense/expense-api-slice';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';

export const store = configureStore({
  reducer: {
    [expenseSliceApi.reducerPath]: expenseSliceApi.reducer,
  },
  middleware: getDefaultMiddle => {
    return getDefaultMiddle().concat(expenseSliceApi.middleware);
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useTypedDispatch = () => useDispatch<AppDispatch>();
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
