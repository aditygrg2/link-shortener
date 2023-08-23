import React, { useEffect, useState } from "react";
import HomePage from "./pages/HomePage";
import { AnimatePresence } from "framer-motion";
import { Route, Routes } from "react-router-dom";
import LinkExpired from "./pages/LinkExpired";
import { useAppDispatch, useAppSelector } from "./hooks/reduxHooks";
import axios from "axios";
import { urls } from "./constants/constant";
import { userActions } from "./store/Slice/UserSlice";
import MainPage from "./pages/MainPage";
import Loaders from "./components/Extras/Loaders";
import { AuthRoutes } from "./constants/routes";

const App: React.FC = () => {
  const isLoggedIn = useAppSelector((state) => state.user.registered);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkRegistered = async () => {
      const response = await axios.get(AuthRoutes.checkAuth, {
        withCredentials: true,
      });

      console.log(response);

      if (response) {
        const status = response.data.registered;
        if (status) {
          console.log(status);
          
          dispatch(userActions.setUser(response.data));
        }
      }
      setLoading(false);
    };
    checkRegistered();
  }, [isLoggedIn]);

  return loading ? (
    <Loaders />
  ) : (
    <AnimatePresence mode="wait">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/expired" element={<LinkExpired />} />
      </Routes>
    </AnimatePresence>
  );
};

export default App;
