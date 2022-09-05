import React from "react";
import { useSelector } from "../../../app/hooks";

function ForAdmin({ children }: React.PropsWithChildren) {
	const user = useSelector((state) => state.general.user);
	const authenticated = useSelector((state) => state.general.authenticated);

	const isAdmin = user.role === "admin" && user.connected;
	if (authenticated && isAdmin) return <>{children}</>;

	return <></>;
}

export default ForAdmin;
