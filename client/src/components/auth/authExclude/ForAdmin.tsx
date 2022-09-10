import React from "react";
import { useSelector } from "../../../app/hooks";

/**
 *
 * this component is a middleware.
 *
 * it'll receive children and render them if the user has admin privileges
 *
 * otherwise it'll return a react fragment:
 *
 * 	<></>
 */
function ForAdmin({ children }: React.PropsWithChildren) {
	const user = useSelector((state) => state.general.user);
	const authenticated = useSelector((state) => state.general.authenticated);

	const isAdmin = user.role === "admin" && user.connected;
	if (authenticated && isAdmin) return <>{children}</>;

	return <></>;
}

export default ForAdmin;
