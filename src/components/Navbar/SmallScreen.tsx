import React from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import Logo from "./Logo";
import { useDispatch } from "react-redux";
import { toggleDrawer } from "../../store/Slice/DrawerNavSlice";


const SmallScreen: React.FC = () => {
    const dispatch = useDispatch();

    return (
        <div className="text-white w-full h-auto flex items-center justify-between p-4 lg:hidden">
            <Logo />
            <button onClick={() => { dispatch(toggleDrawer()) }} title="More options" className="text-white">
                <RxHamburgerMenu className="text-white text-3xl" />
            </button>
        </div>
    )
}

export default SmallScreen;