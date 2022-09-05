import React from "react";
import { useSelector } from "../../../app/hooks";
import { TRole } from "../../../app/slices/general.slice";

type TProps = {
	roles: TRole[];
};

function ForRoles({ children, roles }: React.PropsWithChildren<TProps>) {
	const user = useSelector((state) => state.general.user);
	const authenticated = useSelector((state) => state.general.authenticated);

	const isAllowed = user.connected && roles.includes(user.role);
	if (authenticated && isAllowed) return <>{children}</>;

	return <></>;
}

export default ForRoles;
