import React from "react";
import { useSelector } from "../../../app/hooks";

type TProps = {
	strict?: boolean;
};

/**
 *
 * this component is a middleware.
 *
 * it'll receive children and render them if the user has provider or admin privileges
 *
 * it can also receive strict in which case it'll render only for providers (not admin)
 *
 * otherwise it'll return a react fragment:
 *
 * 	<></>
 */
function ForProviders({ children, strict }: React.PropsWithChildren<TProps>) {
	const user = useSelector((state) => state.general.user);
	const authenticated = useSelector((state) => state.general.authenticated);

	const isProvider =
		(strict
			? user.role === "provider"
			: user.role === "provider" || user.role === "admin") && user.connected;

	if (authenticated && isProvider) return <>{children}</>;

	return <></>;
}

export default ForProviders;
