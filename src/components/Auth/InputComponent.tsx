import React, { LegacyRef, Ref, forwardRef } from "react";

type InputComponentProps = {
  type: string;
  placeholder?: string;
  classname?: string;
  value?: string;
  disabled?: boolean;
  name: string
};

const InputComponent = forwardRef<HTMLInputElement, InputComponentProps>(
  (props, ref) => {
    return (
      <input
        ref={ref}
        type={props.type}
        placeholder={props.placeholder}
        className={
          "w-full h-14 lg:w-96 border border-gray-500 rounded-md bg-transparent p-2 outline-none " + props.classname
        }
        disabled={props.disabled}
        value={props.value}
        name={props.name}
      />
    );
  }
);

export default InputComponent;
