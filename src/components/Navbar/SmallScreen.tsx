import React, {useState} from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import Logo from "./Logo";
import { useDispatch } from "react-redux";
import { toggleDrawer } from "../../store/Slice/DrawerNavSlice";
import RegisterButton from "./RegisterButton";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import RHNUser from "./ProfileButton";
import RightHandSlider from "../Modals/RightHandSliders";
import NavbarList from "./NavBarList";
import { AnimatePresence } from "framer-motion";


const SmallScreen: React.FC = () => {
    const user = useAppSelector(state => state.user);

    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleClick = () => {
        setDrawerOpen(prev => !prev);
    }

    return (
        <div className="text-white w-full h-auto flex items-center justify-between p-4 lg:hidden">
            <Logo />
            <div className="flex items-center space-x-2">
                {!user.registered && <RegisterButton/>}

                <button onClick={handleClick} title="More options" className="text-white">
                    <RxHamburgerMenu className="text-white text-3xl" />
                </button>

                {
                    <AnimatePresence>
                        {
                            drawerOpen && 
                            <RightHandSlider logo={false} width={0} togglerRHNModal={setDrawerOpen}>
                                <NavbarList/>
                            </RightHandSlider>
                        }
                    </AnimatePresence>
                }
            </div>
        </div>
    )
}

export default SmallScreen;