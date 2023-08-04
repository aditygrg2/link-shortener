import React from "react";

const RegisterButton: React.FC = () => {
    return (
        <div className="flex flex-col lg:flex-row lg:space-x-4">
            <button className="py-1 px-5 flex items-center justify-center text-white rounded-lg my-2 text-sm font-poppins">Sign up</button>
            <button className="py-1 px-5 flex items-center justify-center bg-primaryButton-0 text-white rounded-lg my-2 text-sm font-poppins">Log in</button>
        </div>
    )
}

export default RegisterButton;