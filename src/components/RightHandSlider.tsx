import React, { ComponentType } from "react";

import { useMediaQuery } from '@react-hook/media-query';
import { AnimatePresence, motion } from 'framer-motion';
import { useAppSelector } from "../hooks/reduxHooks";
import { RxArrowRight } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { toggleRHN } from "../store/Slice/RHNSlice";
import { toggleLogin } from "../store/Slice/LoginSlice";
import { toggleDrawer } from "../store/Slice/DrawerNavSlice";

interface WrappedComponentProps {
    handleCloseRHN : () => void;
}

const RightHandSlider = <P extends WrappedComponentProps>(
    Container: ComponentType<P>
): React.FC<P> => {

    const RightHandSliderContent: React.FC<P> = (props) => {
        const isSmallScreen = useMediaQuery('(max-width: 768px)');
        
        return (
            <>
                {<div
                    onClick={props.handleCloseRHN}
                    className={`h-full hidden lg:block w-full absolute z-[80] backdrop-blur-xl`}
                ></div>}

                <motion.div
                    initial={{
                        width : 0,
                    }}

                    animate={{
                        width : (isSmallScreen ? '100%' : '40%'),
                    }}

                    exit={{
                        width : '0',
                    }}

                    transition={{
                        type : 'tween',
                        duration : 0.2,
                    }}

                    key={'rhnslider'}
                
                    className={`h-full absolute right-0 top-0 backdrop-blur-md overflow-x-hidden overflow-y-scroll z-[100] scrollbar-hidden`}
                >   
                    <div className="h-14 w-full absolute top-4 left-4 lg:top-6 lg:left-6 z-[110]">
                        <button
                            onClick={props.handleCloseRHN}
                            title="Go back"
                            className="p-2 aspect-square rounded-full border border-gray-700 h-14 flex items-center justify-center cursor-pointer"
                        >
                            <RxArrowRight className="text-primaryButton font-bold text-2xl"/>
                        </button>
                    </div>
                    <div className="h-full w-full absolute top-0 left-0 pt-24 bg-[#131E25]">
                        <Container {...props} />
                    </div>
                </motion.div>
            </>
        )
    };

    return RightHandSliderContent;
};

export default RightHandSlider;
