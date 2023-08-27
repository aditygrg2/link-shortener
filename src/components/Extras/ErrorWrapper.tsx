import React from "react";

type ErrorWrapperPropsType = {
  children?: React.ReactNode;
  errorMessage?: string;
};

const ErrorWrapper: React.FC<ErrorWrapperPropsType> = (props) => {
  return (
    <div>
      {props.children}
      {props.errorMessage && <p className="text-red-500">{props.errorMessage}</p>}
    </div>
  );
};

export default ErrorWrapper;