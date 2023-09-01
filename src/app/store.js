import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../redux/userDetails/userSlice';
import loaderReducer from '../redux/loader'
import NetworkReducer from '../redux/networkDetails/NetworkDetails';
export const store = configureStore({
  reducer: {
    userDetails: userReducer,
    loader: loaderReducer,
    network:NetworkReducer
  },
});
