import React, { Dispatch, SetStateAction } from "react";
import QRCode from "react-qr-code";
import ReactDOM from "react-dom";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { RxArrowRight } from "react-icons/rx";

type RightHandSliderProps = {
  openBool: boolean;
  toggler: any;
  loading: boolean;
  children?: React.ReactElement;
};

export default function RightHandSlider(props: RightHandSliderProps) {
  const dispatch = useAppDispatch();

  return (
    <>
      {props.openBool && (
        <div
          onClick={() => dispatch(props.toggler())}
          className={`h-full hidden lg:block w-full absolute z-[80] backdrop-blur-xl`}
        ></div>
      )}
      <div
        className={`h-full ${
          props.openBool ? "lg:w-[40%] w-full opacity-100" : "w-0 opacity-0"
        } right-0 top-0 backdrop-filter backdrop-blur-md absolute overflow-hidden z-[100] transition-all duration-500 background-signup`}
      >
        <div className="absolute h-full w-full bg-gradient-to-b from-black/80 via-black/40 to-black/20">
          {
            <div
              className={`absolute h-full bg-gradient-to-r from-[#131E25] via-[#131E25]/50 to-[#131E25]/5 ${
                props.loading ? "w-full" : "w-0"
              } transition-all duration-400 top-0 left-0 z-[110] backdrop-blur-md`}
            ></div>
          }

          <div className="w-full h-full py-4 px-2 relative overflow-x-hidden overflow-y-scroll text-white space-y-8 scrollbar-hidden">
            <div className="h-14 w-full">
              <button
                onClick={() => {
                  dispatch(props.toggler());
                }}
                title="Go back"
                className="p-2 aspect-square rounded-full border border-gray-700 h-14 flex items-center justify-center cursor-pointer"
              >
                <RxArrowRight className="text-primaryButton font-bold text-2xl" />
              </button>
            </div>
          </div>
          {props.children}
        </div>
      </div>
    </>
  );
}
