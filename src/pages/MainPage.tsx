import React from "react";
import DrawerNav from "../components/Navbar/DrawerNav";
import Register from "../components/Register/Register";
import HomePage from "./HomePage";

export default function MainPage() {
  return (
    <div className="h-screen w-screen overflow-hidden bg-black font-grotesque">
      <DrawerNav />
      <Register />
      <HomePage />
    </div>
  );
}
