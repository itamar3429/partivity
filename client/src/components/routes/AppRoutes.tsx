import { Route, Routes } from "react-router-dom";
import Login from "../auth/Login";
import LoginReset from "../auth/LoginReset";
import SignUp from "../auth/SignUp";
import WelcomeRoutes from "./WelcomeRoutes";
import About from "../intro/About";
import Dashboard from "../main/Dashboard";
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
