import React from "react";
import { Route } from "react-router-dom";
import SetPageRender from "../helper/Render";
import ProvidersWelcome from "../intro/ProvidersWelcome";
import Welcome from "../intro/Welcome";

const WelcomeRoutes = (redirect: string | undefined = undefined) => {
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
