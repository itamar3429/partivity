import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "../../../redux/hooks";
import Loader from "../../helper/Loader";

type TProps = {
	to?: string;
};

function IsAdmin({ to, children }: React.PropsWithChildren<TProps>) {
	if (!to) to = "/";
	const user = useSelector((state) => state.general.user);
	const authenticated = useSelector((state) => state.general.authenticated);
	const isAdmin = user.role === "admin" && user.connected;
	// const navigate = useNavigate();
	// useEffect(() => {
	// 	if (authenticated)
	// 		if (!isAdmin && user.connected) navigate(to!);
	// 		else if (!isAdmin && !user.connected) navigate("/welcome");
	// }, [user]);
	if (!authenticated) return <Loader></Loader>;
	if (!user.connected) return <Navigate to={"/welcome"} />;
	if (!isAdmin && user.connected) return <Navigate to={to!} />;
	return <>{children}</>;
}

export default IsAdmin;
