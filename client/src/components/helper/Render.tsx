import React, { ReactNode, useEffect } from "react";
import { useDispatch, useSelector } from "../../redux/hooks";
import { setPage } from "../../redux/slices/general.slice";

function SetPage({ page, children }: { page: string; children: ReactNode }) {
	const dispatch = useDispatch();
	const currPage = useSelector((state) => state.general.page);
	// useEffect(() => {
	if (currPage !== page) {
		dispatch(setPage(page));
		console.log(`setting page to: ${page}`);
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
