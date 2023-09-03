import React from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import Logo from "./Logo";
import { useDispatch } from "react-redux";
import { toggleDrawer } from "../../store/Slice/DrawerNavSlice";
import RegisterButton from "./RegisterButton";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import RHNUser from "../Auth/RHNUser";


const SmallScreen: React.FC = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.user);

    return (
        <div className="text-white w-full h-auto flex items-center justify-between p-4 lg:hidden">
            <Logo />
            <div className="flex items-center space-x-2">
                {!user.registered ? <RegisterButton/> : <RHNUser/>}
                <button onClick={() => { dispatch(toggleDrawer(true)) }} title="More options" className="text-white">
                    <RxHamburgerMenu className="text-white text-3xl" />
                </button>
            </div>
        </div>
    )
}

export default SmallScreen;