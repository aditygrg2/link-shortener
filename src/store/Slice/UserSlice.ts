import { createSlice } from "@reduxjs/toolkit";
import store from "../store";

const UserSlice = createSlice({
    name: 'User',
    initialState: {
        registered: false,
        email: '',
        name: '',
    },
    reducers: {
        setUser(state, action){
            console.log(action);
            
            if(!action.payload.userData){
                state.email = '';
                state.name = '';
                state.registered = false;
                return;
            }

            state.email = action.payload.userData.email;
            state.name = action.payload.userData.name;
            state.registered = action.payload.registered;
        },
        logoutUser(state, action){
            state.email = '';
            state.name = '';
            state.registered = false;
        }
    }
})


export const userActions = UserSlice.actions;
export default UserSlice.reducer;