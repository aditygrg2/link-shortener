import React from "react";

const RegisterButton: React.FC = () => {
    return (
        <div className="flex flex-col space-y-4 lg:space-y-0 items-center lg:flex-row lg:space-x-4">
            <button className="h-12 w-full lg:h-8 lg:w-28 flex items-center justify-center text-white rounded-lg border-[0.5px] border-primaryButton-0 hover:bg-primaryButton-0 transition-all text-sm">Sign up</button>
            <button className="h-[3.25rem] lg:h-[2.25rem] w-full lg:w-[7.25rem] flex items-center justify-center bg-primaryButton-0 text-white rounded-lg text-sm hover:scale-105 transition-all">Log in</button>
        </div>
    )
}

export default RegisterButton;