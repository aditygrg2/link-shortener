import React from "react";
import LargeScreen from "./LargeScreen";
import SmallScreen from "./SmallScreen";

export default function NavBar(){
    return (
        <div className="text-white h-auto w-full overflow-hidden">
            <SmallScreen />
            <LargeScreen />
        </div>
    )
}