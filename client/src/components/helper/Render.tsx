import React, { ReactNode } from "react";
import { useDispatch, useSelector } from "../../app/hooks";
import { setPage } from "../../app/slices/general.slice";

function SetPage({ page, children }: { page: string; children: ReactNode }) {
	const dispatch = useDispatch();
	const currPage = useSelector((state) => state.general.page);
	// useEffect(() => {
	if (currPage !== page) {
		dispatch(setPage(page));
	}
	// }, []);
	return <>{children}</>;
}

function SetPageRender(
	element: React.ReactNode,
	page: string,
	Middleware?: Function
) {
	if (Middleware) {
		return (
			<Middleware>
				<SetPage page={page}>{element}</SetPage>
			</Middleware>
		);
	}
	return <SetPage page={page}>{element}</SetPage>;
}

export default SetPageRender;
