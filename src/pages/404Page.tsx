import React from "react";
import { urls } from "../constants/constant";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen selection:bg-orange-400 bg-gradient-to-br from-orange-50 to-orange-100">
      <h1 className="font-extrabold text-4xl md:text-6xl p-4">404 - Not Found</h1>
      <p className="text-sm md:text-lg p-3 w-3/4 text-center">
        It seems the link you were chasing did a little vanishing act. If you
        want, you can use this as a custom URL on our website.
      </p>
      <p className="text-sm md:text-lg p-3 w-3/4 text-center">
        We'll have things sorted before you can say "link shortener supreme"! 🚀
      </p>
      <h1 className="text-lg md:text-2xl p-3 hover:text-orange-500"><a href={urls.CLIENT_URL}>Kuts</a></h1>
    </div>
  );
}
