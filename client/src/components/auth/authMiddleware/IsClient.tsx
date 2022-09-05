import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "../../../app/hooks";
import Loader from "../../helper/Loader";

type TProps = {
	to?: string;
};
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
