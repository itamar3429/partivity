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
function ForUnauthorized({ children }: React.PropsWithChildren<TProps>) {
	const user = useSelector((state) => state.general.user);

	if (!user.connected) return <>{children}</>;

	return <></>;
}

export default ForUnauthorized;
