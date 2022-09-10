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
 * and will render them if the user has at least client privileges
 *
 * else it'll redirect the user to a welcome page.
 */
function IsClient({ to, children }: React.PropsWithChildren<TProps>) {
	if (!to) to = "/welcome";
	const user = useSelector((state) => state.general.user);
	const authenticated = useSelector((state) => state.general.authenticated);
	const isClient = user.connected;
	if (!authenticated) return <Loader></Loader>;
	if (!isClient) return <Navigate to={to} />;
	return <>{children}</>;
}

export default IsClient;
