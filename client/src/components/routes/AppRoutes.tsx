import React, { Children } from "react";
import { Route, Routes } from "react-router-dom";
import { isArray } from "util";
import Home from "../homePage/Home";
import Login from "../loginPage/Login";
import LoginReset from "../loginResetPage/LoginReset";
import SignUp from "../signupPage/SignUp";
import AddRoutes from "./AddRoutes";
const AppRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/login">
				<Route index element={<Login />} />
				<Route path="reset" element={<LoginReset />} />
			</Route>
			<Route path="/register" element={<SignUp />} />
			<Route path="add">{AddRoutes()}</Route>
		</Routes>
	);
};

export default AppRoutes;
