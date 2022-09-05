import React from "react";
import { useSelector } from "../../redux/hooks";

function ClientsRoutes() {
	const isConnected = useSelector((state) => state.general.user.connected);
	return <></>;
}

export default ClientsRoutes;
