import React from "react";
import { Route } from "react-router-dom";
import IsClient from "../auth/authMiddleware/IsClient";
import SetPageRender from "../helper/Render";
import PlanParty from "../main/PlanParty";

const PartyRoutes = () => {
	return (
		<>
			<Route
				path="new"
				element={SetPageRender(<PlanParty />, "event/new", IsClient)}
			></Route>
		</>
	);
};

export default PartyRoutes;
