import { configureStore } from '@reduxjs/toolkit';
import { apis } from './services/service';

export const store = configureStore({
  reducer: {
    [apis.reducerPath]: apis.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apis.middleware),
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type Store = typeof store;
