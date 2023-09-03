import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toggleLogin } from "../../store/Slice/LoginSlice";
import { VscAccount } from 'react-icons/vsc'
import { toggleRHN } from "../../store/Slice/RHNSlice";
import RightHandSlider from "../Modals/RightHandSliders";
import Register from "../Auth/RegisterForm";
import { AnimatePresence } from "framer-motion";

const RegisterButton: React.FC = () => {
    const dispatch = useDispatch();

    const [registerClicked, setRegisterClicked] = useState(false);

    const handleClick = () => {
        setRegisterClicked(prev => !prev);
    }


    return (
        <>
            <button onClick={handleClick} className='p-1 lg:py-2 lg:px-4  text-sm flex items-center space-x-2'>
                <span className="flex items-center justify-center space-x-2">
                    <VscAccount className="text-xl text-primaryButton" />
                    <span className="hidden lg:block">Register</span>
                </span>

            </button>
            {
                <AnimatePresence>
                    {
                        registerClicked &&
                        <RightHandSlider togglerRHNModal={setRegisterClicked}>
                            <Register />
                        </RightHandSlider>
                    }
                </AnimatePresence>
            }
        </>
    )
}

export default RegisterButton;