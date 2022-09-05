import React from "react";
import { useSelector } from "../../../app/hooks";

type TProps = {
	strict?: boolean;
};

function ForClient({ children, strict }: React.PropsWithChildren<TProps>) {
	const user = useSelector((state) => state.general.user);
	const authenticated = useSelector((state) => state.general.authenticated);

	const isClient = strict
		? user.connected && user.role === "client"
		: user.connected;

	if (authenticated && isClient) return <>{children}</>;

	return <></>;
}

export default ForClient;
