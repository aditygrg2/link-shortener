import axios from "axios";
import React, { FormEvent, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { LinkRoutes } from "../constants/routes";
import { BsArrowClockwise, BsLock, BsLockFill } from "react-icons/bs";

export default function PasswordLoader() {
  const params = useParams();
  const urlID = params.id;
  const passwordRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [link, setLink] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (passwordRef.current?.value) {
      setLoading(true);
      const response = await axios.post(
        LinkRoutes.checkLinkAuth,
        {
          password: passwordRef.current.value,
          id: urlID,
        },
        {
          withCredentials: true,
        }
      );

      if (!response.data.status) {
        setLoading(false);
        setError(true);
      } else {
        setLoading(false);
        setError(false);
        setLink(response.data.url);
      }
    }
  };

  // TODO: CHECK FOR VALIDITY OF LINK HERE

  return (
    <div className="w-screen h-screen overflow-hidden bg-gradient-to-r from-slate-100 to-slate-200">
      <div className="w-full h-full flex flex-col justify-center items-center gap-y-2 ">
        <BsLockFill
          className="md:w-20 md:h-20 w-14 h-14"
          color="orange"
        ></BsLockFill>
        <h1 className="text-xl md:text-5xl font-bold">Heads Up!</h1>
        <p className="text-lg md:text-xl text-center w-1/2">
          This link is locked. Enter the password to get link.
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col md:gap-4 gap-2 p-5"
        >
          <input
            placeholder="Enter link password"
            type="password"
            ref={passwordRef}
            className="p-1 pl-2 rounded-lg border border-black flex"
          ></input>
          <button
            type="submit"
            disabled={loading}
            className="border border-black p-2 rounded-lg text-white bg-orange-500 active:bg-orange-600"
          >
            {loading ? (
              <BsArrowClockwise className="animate-spin flex m-auto p-2"></BsArrowClockwise>
            ) : (
              <p className="">Submit</p>
            )}
          </button>
          {error && (
            <p className="text-center text-red-500 font-bold">
              Incorrect Password
            </p>
          )}
          {link && !error && (
            <button>
              <a
                href={`${link}`}
                className="text-orange-500 font-bold hover:font-extrabold"
              >
                Go to Link
              </a>
            </button>
          )}
        </form>
        <h1 className="text-lg md:text-2xl">Kuts</h1>
      </div>
    </div>
  );
}
