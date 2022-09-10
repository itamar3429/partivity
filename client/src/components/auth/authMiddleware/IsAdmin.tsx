import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "../../../app/hooks";
import Loader from "../../helper/Loader";

type TProps = {
	to?: string;
};

/**
 *
 * this Component will get children
 *
 * and will render them if the user has admin privileges
 *
 * else it'll redirect the user to a page he he has privileges to (a dashboard or a welcome page).
 */
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
