import React from "react";
import { useDispatch } from "react-redux";
import { toggleDrawer } from "../../store/Slice/DrawerNavSlice";
import { toggleLogin } from "../../store/Slice/LoginSlice";
import { toggleSignUp } from "../../store/Slice/SignUpSlice";
import {VscAccount} from 'react-icons/vsc'

const RegisterButton: React.FC = () => {
    const dispatch = useDispatch();

    return (
        <button onClick={() => dispatch( toggleLogin()) } className='p-1 lg:py-2 lg:px-4  text-sm flex items-center space-x-2'>
            <VscAccount className="text-xl text-primaryButton"/>
            <h1 className="hidden lg:block">Register</h1>
        </button>
    )
}

export default RegisterButton;