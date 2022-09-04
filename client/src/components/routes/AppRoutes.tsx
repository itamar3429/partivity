import { Route, Routes } from "react-router-dom";
import Login from "../auth/Login";
import LoginReset from "../auth/LoginReset";
import SignUp from "../auth/SignUp";
import WelcomeRoutes from "./WelcomeRoutes";
import About from "../intro/About";
import Dashboard from "../main/Dashboard";
import SetPageRender from "../helper/SetPageRender";
import PartyRoutes from "./PartyRoutes";
const AppRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={SetPageRender(<Dashboard />, "dashboard")} />
			<Route path="/welcome">{WelcomeRoutes()}</Route>
			<Route path="/event">{PartyRoutes()}</Route>
			<Route path="/login">
				<Route index element={SetPageRender(<Login />, "login")} />
				<Route
					path="reset"
					element={SetPageRender(<LoginReset />, "login/reset")}
				/>
			</Route>
			<Route
				path="/register"
				element={SetPageRender(<SignUp />, "register")}
			/>
			<Route
				path="about"
				element={SetPageRender(<About />, "intro/about")}
			/>
		</Routes>
	);
};

export default AppRoutes;
