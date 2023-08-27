import React from "react";
import { BsArrowClockwise } from "react-icons/bs";

type FacetPropsType = {
  className: string;
  value?: string;
  onValueChange?: (e: any) => void;
  placeholder?: string;
  type: string;
  loader?: boolean;
  loadWhen?: boolean;
  inputId?: string;
  inputClassName?: string;
  label: boolean;
  others?: {
    [key: string]: any
  }
};

const Facet: React.FC<FacetPropsType> = (props) => {
  return (
    <div
      className={`rounded-md p-2 flex items-center px-4 bg-[#222222] ${props.className}`}
    >
      {props.label && <label htmlFor={props.inputId}>{props.placeholder}</label>}
      <input
        value={props.value}
        onChange={props.onValueChange}
        placeholder={props.placeholder}
        type={props.type}
        id={props.inputId}
        className={`bg-transparent outline-none w-full `+ props.inputClassName}
        {...props.others}
      />
      {props.loadWhen && <BsArrowClockwise className='animate-spin'></BsArrowClockwise>}
    </div>
  );
};

export default Facet;
