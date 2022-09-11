import React from "react";
import { Route } from "react-router-dom";
import IsProvider from "../auth/authMiddleware/IsProvider";
import SetPageRender from "../helper/Render";
import EditImages from "../main/providers/EditImages";
import AddService from "../main/providers/AddService";
import Providers from "../main/providers/Providers";
import EditService from "../main/providers/EditService";
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
				element={SetPageRender(<Schedule />, "providers/add", IsProvider)}
			></Route>
			<Route
				path="edit/service/:service_id"
				element={SetPageRender(
					<EditService />,
					"providers/add",
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
