import React from "react";
import { Route } from "react-router-dom";
import IsNotLogged from "../auth/authMiddleware/IsNotLogged";
import Login from "../auth/Login";
import LoginReset from "../auth/LoginReset";
import SetPageRender from "../helper/Render";

const AuthRoutes = () => {
	return (
		<>
			<Route
				index
				element={SetPageRender(<Login />, "login", IsNotLogged)}
			/>
			<Route
				path="reset"
				element={SetPageRender(<LoginReset />, "login/reset", IsNotLogged)}
			/>
		</>
	);
};

export default AuthRoutes;
