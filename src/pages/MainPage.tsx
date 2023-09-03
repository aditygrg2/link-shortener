import React from "react";
import HomePage from "./HomePage";
import RegisterInRHN from "../components/Auth/RegisterInRHN";
import { useDispatch, useSelector } from "react-redux";
import { useAppSelector } from "../hooks/reduxHooks";
import { toggleLogin } from "../store/Slice/LoginSlice";
import DrawerNavRHN from "../components/Navbar/DrawerNavRHN";
import { toggleDrawer } from "../store/Slice/DrawerNavSlice";

export default function MainPage() {

  const isLogInOpen = useAppSelector(state => state.isLoginOpen);
  const isDrawerNavOpen = useAppSelector(state => state.drawerNav);
  const dispatch = useDispatch();

  return (
    <div className="h-screen w-screen overflow-hidden font-grotesque background">
      <div className="h-full w-full overflow-hidden bg-gradient-to-r from-black/80 via-black/60 to-black/0">

        {
          isDrawerNavOpen && <DrawerNavRHN handleCloseRHN={() => dispatch(toggleDrawer(false))}/>
        }

        {isLogInOpen && 
          <div className="h-full w-full absolute top-0 left-0 overflow-hidden">
            <RegisterInRHN handleCloseRHN={() => dispatch(toggleLogin(false))}/>
          </div>
        }

        <HomePage />
      </div>
    </div>
  );
}
