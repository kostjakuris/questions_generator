import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { questionApi } from './questionApi';
import questionReducer from './slice';


const userReducer = combineReducers({
  question: questionReducer,
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
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']