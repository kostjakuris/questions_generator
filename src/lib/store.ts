import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { questionApi } from './questionApi';


const userReducer = combineReducers({
  [questionApi.reducerPath]: questionApi.reducer,
});
export const setupStore = () => {
  return configureStore({
    reducer: userReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(questionApi.middleware),
  });
};

export type AppStore = ReturnType<typeof setupStore>