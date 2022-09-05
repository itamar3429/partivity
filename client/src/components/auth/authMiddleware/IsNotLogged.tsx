import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "../../../redux/hooks";
import Loader from "../../helper/Loader";

type TProps = {
	to?: string;
};
function IsNotLogged({ to, children }: React.PropsWithChildren<TProps>) {
	if (!to) to = "/";
	const user = useSelector((state) => state.general.user);
	const authenticated = useSelector((state) => state.general.authenticated);

	const isClient = user.connected;

	if (!authenticated) return <Loader></Loader>;
	if (isClient) return <Navigate to={to} />;
	return <>{children}</>;
}

export default IsNotLogged;
