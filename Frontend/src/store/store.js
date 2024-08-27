import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import popertiesSlice from './popertiesSlice';
const store = configureStore({
  reducer: {
    user:userSlice,
    properties:popertiesSlice,
   
  },
});

export default store;
