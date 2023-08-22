import React from "react";
import LargeScreen from "./LargeScreen";
import SmallScreen from "./SmallScreen";

export default function NavBar(){
    return (
        <div className="text-white bg-transparent h-auto w-full overflow-hidden sticky top-0 z-40">
            <SmallScreen/>
            <LargeScreen />
        </div>
    )
}