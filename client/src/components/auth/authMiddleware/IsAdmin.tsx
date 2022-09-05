import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "../../../app/hooks";
import Loader from "../../helper/Loader";

type TProps = {
	to?: string;
};

function IsAdmin({ to, children }: React.PropsWithChildren<TProps>) {
	if (!to) to = "/";
	const user = useSelector((state) => state.general.user);
	const authenticated = useSelector((state) => state.general.authenticated);
	const isAdmin = user.role === "admin" && user.connected;
	if (!authenticated) return <Loader></Loader>;
	if (!user.connected) return <Navigate to={"/welcome"} />;
	if (!isAdmin && user.connected) return <Navigate to={to!} />;
	return <>{children}</>;
}

export default IsAdmin;
