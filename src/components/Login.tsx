import React from "react";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { RxArrowRight, RxHamburgerMenu } from 'react-icons/rx';
import { useSelector, useDispatch } from 'react-redux';
import { toggleLogin } from "../store/Slice/LoginSlice";
import NavbarList from "./Navbar/NavBarList";
import { toggleDrawer } from "../store/Slice/DrawerNavSlice";

interface stateObj {
    isLoginOpen : boolean,
}

const Login : React.FC = () => {
    const isLoginOpen = useSelector( (state : stateObj )=> state.isLoginOpen );
    const dispatch = useDispatch();

    return (
        <>
            {
                (
                    <div
                        className={`h-full ${isLoginOpen ? 'lg:w-[40%] w-full' : "w-0"} flex flex-col items-end bg-black/10 backdrop-filter backdrop-blur-md absolute top-0 right-0 overflow-hidden z-[100] transition-all duration-400`}>

                        <div className="w-full h-full flex flex-col py-4 px-2 relative overflow-x-hidden overflow-y-scroll">

                            <div className="h-14 w-full">
                                <button onClick={ () => {dispatch( toggleLogin() ) ; }} title="Go back" className="p-2 aspect-square rounded-full border border-gray-400 h-14 flex items-center justify-center">
                                    <RxArrowRight className="text-white font-bold text-2xl" />
                                </button>
                            </div>

                            <form>
                                <input type='text' placeholder="Email"/>
                                <input type='password' placeholder="Password"/>
                                <input type='submit' value="Submit" className="text-white"/>
                            </form>

                        </div>
                    </div>
                )
            }
        </>
    )
}

export default Login;