import React from "react";
import { Route } from "react-router-dom";
import SetPageRender from "../helper/SetPageRender";
import PlanParty from "../main/PlanParty";

const WelcomeRoutes = () => {
	return (
		<>
			{/* <Route index element={SetPageRender(<Welcome />, "intro")}></Route> */}
			<Route
				path="new"
				element={SetPageRender(<PlanParty />, "event/new")}
			></Route>
		</>
	);
};

export default WelcomeRoutes;
