import React, { Dispatch, SetStateAction } from "react";
import ReactDOM from "react-dom";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { RxArrowRight } from "react-icons/rx";
import { AnimatePresence, motion } from 'framer-motion'
import { useMediaQuery } from '@react-hook/media-query';

type RightHandSliderProps = {
  logo: boolean,
  width: Number,
  togglerRHNModal: Dispatch<SetStateAction<boolean>>;
  children?: React.ReactElement;
};

const RightHandSliderModal = (props: RightHandSliderProps) => {
  const isSmallScreen = useMediaQuery('(max-width: 768px)');

  return (
    <>
      {

        <div
          onClick={() => props.togglerRHNModal(false)}
          className={`h-full hidden lg:block w-full absolute backdrop-blur-xl z-[80]`}
        />

      }
      <motion.div
        initial={{
          width: 0,
          opacity: 0,
        }}

        animate={{
          width: (isSmallScreen ? '100%' : `${props.width}%`),
          opacity: 1,
        }}

        exit={{
          width: 0,
          opacity: 0,
        }}

        transition={{
          type: 'spring',
          duration: 0.3,
        }}

        key={'rhnslider'}
        className={`h-full absolute right-0 top-0 backdrop-blur-md overflow-x-hidden overflow-y-scroll scrollbar-hidden z-[100]`}
      >

        {
          props.logo ?

            <div className="h-14 w-full absolute top-6 left-2 z-[110]">
              <button
                onClick={() => props.togglerRHNModal(false)}
                className="text-3xl text-left whitespace-nowrap w-full px-2">
                <span className="text-white text-5xl">Kuts</span>
              </button>
            </div>

            :

            <div className="h-14 w-full absolute top-6 left-2 z-[110]">
              <button
                onClick={() => props.togglerRHNModal(false)}
                title="Go back"
                className="aspect-square rounded-full border border-gray-700 h-14 flex items-center justify-center cursor-pointer"
              >
                <RxArrowRight className="text-primaryButton font-bold text-2xl" />
              </button>
            </div>
        }

        <div className="h-full w-full absolute top-0 left-0 pt-24 bg-[#131E25]">
          {props.children}
        </div>
      </motion.div>
    </>
  );
}

const rightHandSliderId = document.getElementById('rightHandSlider');

export default function RightHandSlider(props: RightHandSliderProps) {
  return (
    ReactDOM.createPortal(<RightHandSliderModal {...props} />, rightHandSliderId!)
  );
}

