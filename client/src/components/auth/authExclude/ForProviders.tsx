import React from "react";
import { useSelector } from "../../../app/hooks";

type TProps = {
	strict?: boolean;
};

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
