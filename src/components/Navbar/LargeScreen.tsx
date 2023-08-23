import React from "react";
import Logo from "./Logo";
import NavbarList from "./NavBarList";
import RegisterButton from "./RegisterButton";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";

const LargeScreen : React.FC = () => {
    const user = useAppSelector(state => state.user);
    
    return (
        <div className="hidden lg:flex lg:flex-row items-center justify-between m-4">
            <NavbarList/>
            <Logo/>
            {!user.registered ? <RegisterButton/> : <div>Logged In</div>}
        </div>
    )
}

export default LargeScreen;