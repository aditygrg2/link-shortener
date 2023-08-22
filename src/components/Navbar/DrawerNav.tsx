import React from 'react'
import { motion } from "framer-motion";
import NavbarList from "./NavBarList";
import RegisterButton from "./RegisterButton";
import { RxArrowRight, RxHamburgerMenu } from 'react-icons/rx';
import { useSelector, useDispatch } from 'react-redux';
import { toggleDrawer } from '../../store/Slice/DrawerNavSlice'

interface stateObj {
    drawerNav : boolean,
}

const DrawerNav: React.FC = () => {
    const isDrawerOpen = useSelector( (state : stateObj )=> state.drawerNav );
    const dispatch = useDispatch();

    return (
        <>
            {
                (
                    <motion.div
                        initial={{
                            width: '0',
                            opacity: '0'
                        }}
                        animate={{
                            width: isDrawerOpen ? '100%' : '0',
                            opacity: '1'
                        }}

                        transition={{
                            type: 'tween',
                            stiffness: '500',
                            damping: '30'
                        }}
                        className="h-full w-full flex flex-col items-end bg-black/10 backdrop-filter backdrop-blur-md absolute top-0 right-0 overflow-hidden z-40">

                        <div className="w-full h-full flex flex-col justify-between py-4 px-2 relative overflow-x-hidden overflow-y-scroll">

                            <div className="h-14 w-full">
                                <button onClick={ () => dispatch( toggleDrawer() )} title="Go back" className="p-2 aspect-square rounded-full border border-gray-400 h-14 flex items-center justify-center">
                                    <RxArrowRight className="text-white font-bold text-2xl" />
                                </button>
                            </div>

                            <NavbarList />
                        </div>
                    </motion.div>
                )
            }
        </>
    )
}

export default DrawerNav;