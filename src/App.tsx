import React, { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import LinkExpired from "./pages/LinkExpired";
import { useAppDispatch } from "./hooks/reduxHooks";
import axios from "axios";
import { userActions } from "./store/Slice/UserSlice";
import MainPage from "./pages/MainPage";
import Loaders from "./components/Extras/Loaders";
import { AuthRoutes, LinkRoutes } from "./constants/routes";
import PasswordLoader from "./pages/PasswordLoader";
import NotFoundPage from "./pages/404Page";

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const route = document.URL.split("/")[3];
  const navigate = useNavigate();

  useEffect(() => {
    if (route.length > 0) {
      setLoading(true);
      const redirectLink = async () => {
        const res = await axios.get(LinkRoutes.initialRouter(route), {
          withCredentials: true,
        });

        if (res.data.isExpired) {
          navigate("/expired");
        } else if (res.data.isSecured) {
          navigate("/password-auth/" + res.data.id);
        } else if (res.data.isInvalid) {
          navigate("/404");
        }
        else{
          document.location.replace(res.data.link);
        }
      };
      setLoading(false);
      redirectLink();
    } else {
      const checkInitialRun = async () => {
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
      checkInitialRun();
    }
  }, []);

  return loading ? (
    <Loaders />
  ) : (
    <AnimatePresence mode="wait">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/expired" element={<LinkExpired />} />
        <Route path="/password-auth/:id" element={<PasswordLoader />} />
        <Route path="/404" element={<NotFoundPage />}></Route>
      </Routes>
    </AnimatePresence>
  );
};

export default App;
