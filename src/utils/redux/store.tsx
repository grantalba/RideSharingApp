import {configureStore} from '@reduxjs/toolkit';
import {} from '@reduxjs/toolkit';
import rideReducer from './rideSlice';
import userReducer from './userSlice';

const store = configureStore({
  reducer: {
    ride: rideReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
