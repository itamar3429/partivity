import React, { ReactNode } from "react";
import { useDispatch, useSelector } from "../../redux/hooks";
import { setPage } from "../../redux/slices/general.slice";

function SetPage({ page, children }: { page: string; children: ReactNode }) {
	const dispatch = useDispatch();
	const currPage = useSelector((state) => state.general.page);
	if (currPage !== page) {
		dispatch(setPage(page));
		console.log(`setting page to: ${page}`);
	}
	return <>{children}</>;
}

function SetPageRender(element: React.ReactNode, page: string) {
	return <SetPage page={page}>{element}</SetPage>;
}

export default SetPageRender;
