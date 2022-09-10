import React, { useEffect } from "react";
import { apiAuth } from "../../api/auth";
import { useDispatch } from "../../app/hooks";
import { setUser } from "../../app/slices/general.slice";

/**
 *
 * this component is in charge of setting the user info when the application loads.
 *
 * this will be used to determine if the user is logged in
 *
 * and if he should be given privileges and in what extent (his role)
 */
function GetUserInfo() {
	const dispatch = useDispatch();

	useEffect(() => {
		apiAuth().then((res) => {
			if (res.success && res.user) {
				dispatch(setUser({ ...res.user, connected: true }));
			} else {
				dispatch(
					setUser({
						connected: false,
					} as any)
				);
			}
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return <></>;
}

export default GetUserInfo;
