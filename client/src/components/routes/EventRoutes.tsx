import React from "react";
import { Route } from "react-router-dom";
import IsClient from "../auth/authMiddleware/IsClient";
import SetPageRender from "../helper/Render";
import EditEvent from "../main/clients/event/EditEvent";
import PlanEvent from "../main/clients/event/PlanEvent";

const EventRoutes = () => {
	return (
		<>
			<Route
				path="new"
				element={SetPageRender(<PlanEvent />, "event/new", IsClient)}
			></Route>
			<Route
				path="edit/:eventId"
				element={SetPageRender(<EditEvent />, "event/edit", IsClient)}
			></Route>
		</>
	);
};

export default EventRoutes;
