import React, { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Route, Routes } from "react-router-dom";
import LinkExpired from "./pages/LinkExpired";
import { useAppDispatch } from "./hooks/reduxHooks";
import axios from "axios";
import { userActions } from "./store/Slice/UserSlice";
import MainPage from "./pages/MainPage";
import Loaders from "./components/Extras/Loaders";
import { AuthRoutes } from "./constants/routes";
import PasswordLoader from "./pages/PasswordLoader";

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkRegistered = async () => {
      const response = await axios.get(AuthRoutes.checkAuth, {
        withCredentials: true,
      });

      if (response) {
        const status = response.data.registered;
        if (status) {          
          dispatch(userActions.setUser(response.data));
        }
      }
      setLoading(false);
    };
    checkRegistered();
  }, []);

  return loading ? (
    <Loaders />
  ) : (
    <AnimatePresence mode="wait">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/expired" element={<LinkExpired />} />
        <Route path="/password-auth/:id" element={<PasswordLoader/>}/>
      </Routes>
    </AnimatePresence>
  );
};

export default App;
