import React from "react";
import HomePage from "./HomePage";

export default function MainPage() {

  return (
    <div className="h-screen w-screen overflow-hidden font-grotesque background">
      <div className="h-full w-full overflow-hidden bg-gradient-to-r from-black/80 via-black/60 to-black/0">
        <HomePage />
      </div>
    </div>
  );
}
