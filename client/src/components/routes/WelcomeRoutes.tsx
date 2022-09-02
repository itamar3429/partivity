import React from "react";
import { Route } from "react-router-dom";
import ProvidersWelcome from "../intro/ProvidersWelcome";
import Welcome from "../intro/Welcome";

const WelcomeRoutes = () => {
	return (
		<>
			<Route index element={<Welcome />}></Route>
			<Route path="providers" element={<ProvidersWelcome />}></Route>
		</>
	);
};

export default WelcomeRoutes;
