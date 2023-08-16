import React from "react";
import Logo from "./Logo";
import NavbarList from "./NavBarList";
import RegisterButton from "./RegisterButton";

const LargeScreen : React.FC = () => {
    return (
        <div className="hidden lg:flex lg:flex-row items-center justify-between m-4">
            <NavbarList/>
            <Logo/>
            <RegisterButton/>
        </div>
    )
}

export default LargeScreen;