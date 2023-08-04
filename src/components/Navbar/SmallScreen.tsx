import React from "react";
import Logo from "./Logo";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { RxArrowRight, RxHamburgerMenu } from 'react-icons/rx';
import NavbarList from "./NavBarList";
import RegisterButton from "./RegisterButton";

const SmallScreen: React.FC = () => {
    const [visible, setVisible] = useState(false);

    return (
        <div className="text-white w-full h-auto flex items-center justify-between mt-10 px-4 lg:hidden">
            <Logo />
            <button onClick={() => { setVisible(prev => !prev) }} title="More options" className="text-white">
                <RxHamburgerMenu className="text-white text-3xl" />
            </button>
            <AnimatePresence>
                {
                    visible && (
                        <motion.div
                            initial={{
                                width: '0',
                                opacity: '0'
                            }}
                            animate={{
                                width: '100%',
                                opacity: '1'
                            }}
                            exit={{
                                width: '0',
                                opacity: '0'
                            }}
                            transition={{
                                type: 'tween',
                                stiffness: '500',
                                damping: '30'
                            }}

                            className="h-full w-full flex flex-col items-end text-black backdrop-filter backdrop-blur-md absolute top-0 right-0 overflow-hidden">

                            <div className="w-full h-full flex flex-col justify-between py-8 px-2 float-right relative overflow-x-hidden overflow-y-scroll">

                                <div className="h-14 w-full mb-4">
                                    <button onClick={() => setVisible(prev => !prev)} title="Go back" className="p-2 aspect-square rounded-full border border-gray-400 h-14 flex items-center justify-center">
                                        <RxArrowRight className="text-white font-bold text-2xl" />
                                    </button>
                                </div>

                                <NavbarList />
                                <RegisterButton />
                            </div>
                        </motion.div>
                    )
                }
            </AnimatePresence>
        </div>
    )
}

export default SmallScreen;