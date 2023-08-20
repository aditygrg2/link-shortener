// store.js
import { configureStore } from '@reduxjs/toolkit';

import DrawerNavSlice from './Slice/DrawerNavSlice';

import isLoginOpen from './Slice/LoginSlice';
import isSignUpOpen from './Slice/SignUpSlice';

const store = configureStore({
  reducer: {
    drawerNav: DrawerNavSlice,
    isLoginOpen : isLoginOpen,
    isSignUpOpen : isSignUpOpen , 
  },
});

export default store;
