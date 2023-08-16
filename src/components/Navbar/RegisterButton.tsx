import React from "react";

const RegisterButton: React.FC = () => {
    return (
        <div className="flex flex-col items-center lg:flex-row lg:space-x-4">
            <button className="h-8 w-28 flex items-center justify-center text-white rounded-lg border border-primaryButton-0 text-sm font-poppins">Sign up</button>
            <button className="h-[2.25rem] w-[7.25rem] flex items-center justify-center bg-primaryButton-0 text-white rounded-lg text-sm font-poppins">Log in</button>
        </div>
    )
}

export default RegisterButton;