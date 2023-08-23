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
            if(!action.payload.registered){
                state = {
                    email: '',
                    name: '',
                    registered: false,
                }
                return;
            }

            return state = {
                email: action.payload.userData.email,
                name: action.payload.userData.name,
                registered: action.payload.registered
            }            
        },
        logoutUser(state, action){
            return state = {
                email: '',
                name: '',
                registered: false
            }
        }
    }
})


export const userActions = UserSlice.actions;
export default UserSlice.reducer;