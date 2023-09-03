import React from "react";
import { useDispatch } from "react-redux";
import { toggleLogin } from "../../store/Slice/LoginSlice";
import {VscAccount} from 'react-icons/vsc'
import { toggleRHN } from "../../store/Slice/RHNSlice";

const RegisterButton: React.FC = () => {
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(toggleLogin(true));
    }

    return (
        <button onClick={handleClick} className='p-1 lg:py-2 lg:px-4  text-sm flex items-center space-x-2'>
            <VscAccount className="text-xl text-primaryButton"/>
            <h1 className="hidden lg:block">Register</h1>
        </button>
    )
}

export default RegisterButton;