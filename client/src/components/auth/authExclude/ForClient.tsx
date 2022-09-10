import React from "react";
import { useSelector } from "../../../app/hooks";

type TProps = {
	strict?: boolean;
};

/**
 *
 * this component is a middleware.
 *
 * it'll receive children and render them if the user has at least client privileges
 *
 * otherwise it'll return a react fragment:
 *
 * 	<></>
 */
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
