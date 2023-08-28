import React, { ReactElement } from "react";
import { BsArrowClockwise, BsInfo } from "react-icons/bs";
import { Tooltip } from "react-tooltip";
import { handleCustomURLError } from "../../utils/handlers";

type FacetPropsType = {
  className?: string;
  value?: string;
  onValueChange?: (e: any) => void;
  placeholder?: string;
  type: string;
  loader?: boolean;
  loadWhen?: boolean;
  inputId?: string;
  inputClassName?: string;
  label: boolean;
  errorVariable?: boolean;
  errorFunction?: () => string;
  onClick?: () => void;
  labelTitle?: string;
  others?: {
    [key: string]: any;
  };
  children?: React.ReactElement
};

const Facet: React.FC<FacetPropsType> = (props) => {
  return (
    <div
      className={`rounded-md p-2 flex items-center px-4 bg-[#222222] ${props.className}`}
    >
      {props.label && (
        <label htmlFor={props.inputId}>{props.labelTitle}</label>
      )}
      <input
        value={props.value}
        onChange={props.onValueChange}
        placeholder={props.placeholder}
        type={props.type}
        id={props.inputId}
        className={`bg-transparent outline-none w-full ` + props.inputClassName}
        {...props.others}
      />
      {props.children}
      {props.loadWhen && (
        <BsArrowClockwise className="animate-spin"></BsArrowClockwise>
      )}
      {props.errorVariable && props.value && props.errorFunction && (
        <>
          <BsInfo
            data-tooltip-id={props.placeholder}
            data-tooltip-content={props.errorFunction()}
            data-tooltip-place="top"
            className="rounded-full scale-150 bg-amber-500"
          ></BsInfo>
          <Tooltip id={props.placeholder}></Tooltip>
        </>
      )}
    </div>
  );
};

export default Facet;
