import React from "react";
import { useSelector } from "../../app/hooks";

function ClientsRoutes() {
	const isConnected = useSelector((state) => state.general.user.connected);
	return <></>;
}

export default ClientsRoutes;
