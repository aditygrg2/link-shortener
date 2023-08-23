import React from "react";
import DrawerNav from "../components/Navbar/DrawerNav";
import Register from "../components/Register/Register";
import HomePage from "./HomePage";
import NavBar from "../components/Navbar/NavBar";

export default function MainPage() {
  return (
    <div className="h-screen w-screen overflow-hidden font-grotesque background">
      <div className="h-full w-full overflow-hidden bg-gradient-to-r from-black/80 via-black/60 to-black/0">
        {/* <NavBar /> */}
        <DrawerNav />
        <div className="h-full w-full absolute top-0 overflow-hidden">
          <Register />
        </div>
        <HomePage />
      </div>
    </div>
  );
}
