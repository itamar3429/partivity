import React, { useEffect } from "react";
import { apiAuth } from "../../api/auth";
import { useDispatch } from "../../app/hooks";
import { setUser } from "../../app/slices/general.slice";

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
