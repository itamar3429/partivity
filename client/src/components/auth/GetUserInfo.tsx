import React, { useEffect } from "react";
import { apiAuth } from "../../api/auth";
import { useDispatch } from "../../redux/hooks";
import { setUser } from "../../redux/slices/general.slice";

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
	}, []);
	return <div></div>;
}

export default GetUserInfo;
