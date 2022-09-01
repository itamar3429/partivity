import { Route, Routes } from "react-router-dom";
import Welcome from "../welcome/Welcome";
import Login from "../login/Login";
import LoginReset from "../loginResetPage/LoginReset";
import SignUp from "../signup/SignUp";
import WelcomeRoutes from "./WelcomeRoutes";
import About from "../about/About";
import Dashboard from "../dashboard/Dashboard";
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/welcome">{WelcomeRoutes()}</Route>
      <Route path="/login">
        <Route index element={<Login />} />
        <Route path="reset" element={<LoginReset />} />
      </Route>
      <Route path="/register" element={<SignUp />} />
      <Route path="about" element={<About />} />
    </Routes>
  );
};

export default AppRoutes;
