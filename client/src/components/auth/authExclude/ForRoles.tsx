import React from "react";
import { useSelector } from "../../../app/hooks";
import { TRole } from "../../../app/slices/general.slice";

type TProps = {
	roles: TRole[];
};

/**
 *
 * this component is a middleware.
 *
 * it'll receive children and roles array
 *
 * it will render the children if the user role is in the roles array
 *
 * possible roles are :
 *
 * 	"admin" | "provider" | "client"
 *
 * otherwise it'll return a react fragment:
 *
 * 	<></>
 */
function ForRoles({ children, roles }: React.PropsWithChildren<TProps>) {
	const user = useSelector((state) => state.general.user);
	const authenticated = useSelector((state) => state.general.authenticated);

	const isAllowed = user.connected && roles.includes(user.role);

	if (authenticated && isAllowed) return <>{children}</>;

	return <></>;
}

export default ForRoles;
