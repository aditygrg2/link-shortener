// store.js
import { configureStore } from '@reduxjs/toolkit';

import DrawerNavSlice from './Slice/DrawerNavSlice';

import isLoginOpen from './Slice/LoginSlice';
import isSignUpOpen from './Slice/SignUpSlice';
import UserSlice from './Slice/UserSlice';

const store = configureStore({
  reducer: {
    drawerNav: DrawerNavSlice,
    isLoginOpen : isLoginOpen,
    isSignUpOpen : isSignUpOpen, 
    user: UserSlice
  },
});


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;
