import React from "react";
import { Route } from "react-router-dom";
import IsProvider from "../auth/authMiddleware/IsProvider";
import SetPageRender from "../helper/Render";
import EditImages from "../main/providers/serviceImages/EditImages";
import AddService from "../main/providers/service/AddService";
import Providers from "../main/providers/dashboard";
import EditService from "../main/providers/service/EditService";
import Schedule from "../main/providers/schedule/Schedule";

const WelcomeRoutes = () => {
	return (
		<>
			<Route
				index
				element={SetPageRender(<Providers />, "providers", IsProvider)}
			></Route>
			<Route
				path="add"
				element={SetPageRender(<AddService />, "providers/add", IsProvider)}
			></Route>
			<Route
				path="schedule/:service_id"
				element={SetPageRender(
					<Schedule />,
					"providers/schedule",
					IsProvider
				)}
			></Route>
			<Route
				path="edit/service/:service_id"
				element={SetPageRender(
					<EditService />,
					"providers/edit",
					IsProvider
				)}
			></Route>
			<Route
				path="edit/images/:service_id"
				element={SetPageRender(
					<EditImages />,
					"providers/edit/images",
					IsProvider
				)}
			></Route>
		</>
	);
};

export default WelcomeRoutes;
