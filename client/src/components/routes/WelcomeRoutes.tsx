import React from "react";
import { Route } from "react-router-dom";
import SetPageRender from "../helper/SetPageRender";
import ProvidersWelcome from "../intro/ProvidersWelcome";
import Welcome from "../intro/Welcome";

const WelcomeRoutes = () => {
	return (
		<>
			<Route index element={SetPageRender(<Welcome />, "intro")}></Route>
			<Route
				path="providers"
				element={SetPageRender(<ProvidersWelcome />, "intro/providers")}
			></Route>
		</>
	);
};

export default WelcomeRoutes;
