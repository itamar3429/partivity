import React, { useEffect } from "react";
import { Route, useNavigate } from "react-router-dom";
import { useSelector } from "../../redux/hooks";
import IsProvider from "../auth/authMiddleware/IsProvider";
import SetPageRender from "../helper/Render";
import Providers from "../main/Providers";

const WelcomeRoutes = () => {
	return (
		<>
			<Route
				index
				element={SetPageRender(<Providers />, "providers", IsProvider)}
			></Route>
			<Route
				path="add"
				element={SetPageRender(<Providers />, "providers/add", IsProvider)}
			></Route>
		</>
	);
};

export default WelcomeRoutes;
