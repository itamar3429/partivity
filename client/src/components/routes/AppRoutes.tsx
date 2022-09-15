import { Route, Routes } from "react-router-dom";
import Register from "../auth/Register";
import WelcomeRoutes from "./WelcomeRoutes";
import About from "../intro/About";
import Dashboard from "../main/clients/dashboard/Dashboard";
import Render from "../helper/Render";
import EventRoutes from "./EventRoutes";
import ProvidersRoutes from "./ProvidersRoutes";
import LoginRoutes from "./LoginRoutes";
import IsNotLogged from "../auth/authMiddleware/IsNotLogged";
import GetUserInfo from "../auth/GetUserInfo";
import IsClient from "../auth/authMiddleware/IsClient";

/**
 *
 * this component manages the app routes.
 *
 * each route with two or more sub routes being received by its own component
 *
 * 	<Route path="/">{IndexRoutes()}</Route>
 *
 * indexRoutes:
 *
 * 	return <>
 * 		<Route index element={<IndexComp />} />
 * 		<Route path='/secondary' element={<SecondaryComp />} />
 * 	</>
 *
 */
const AppRoutes = () => {
	GetUserInfo();

	return (
		<Routes>
			<Route
				path="/"
				element={Render(<Dashboard />, "dashboard", IsClient)}
			/>
			<Route path="/welcome">{WelcomeRoutes()}</Route>
			<Route path="/event">{EventRoutes()}</Route>
			<Route path="/providers">{ProvidersRoutes()}</Route>
			<Route path="/login">{LoginRoutes()}</Route>
			<Route
				path="/register"
				element={Render(<Register />, "register", IsNotLogged)}
			/>
			<Route path="about" element={Render(<About />, "intro/about")} />
			<Route path="*" element={<div>404 page not found</div>} />
		</Routes>
	);
};

export default AppRoutes;
