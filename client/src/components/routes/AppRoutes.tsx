import { Route, Routes } from "react-router-dom";
import Register from "../auth/Register";
import WelcomeRoutes from "./WelcomeRoutes";
import About from "../intro/About";
import Dashboard from "../main/Dashboard";
import Render from "../helper/Render";
import PartyRoutes from "./PartyRoutes";
import ProvidersRoutes from "./ProvidersRoutes";
import LoginRoutes from "./LoginRoutes";
import IsNotLogged from "../auth/authMiddleware/IsNotLogged";
import GetUserInfo from "../auth/GetUserInfo";
import IsClient from "../auth/authMiddleware/IsClient";
const AppRoutes = () => {
	GetUserInfo();
	return (
		<Routes>
			<Route
				path="/"
				element={Render(<Dashboard />, "dashboard", IsClient)}
			/>
			<Route path="/welcome">{WelcomeRoutes()}</Route>
			<Route path="/event">{PartyRoutes()}</Route>
			<Route path="/providers">{ProvidersRoutes()}</Route>
			<Route path="/login">{LoginRoutes()}</Route>
			<Route
				path="/register"
				element={Render(<Register />, "register", IsNotLogged)}
			/>
			<Route path="about" element={Render(<About />, "intro/about")} />
		</Routes>
	);
};

export default AppRoutes;
