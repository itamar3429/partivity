import React, { ReactNode } from "react";
import { useDispatch, useSelector } from "../../app/hooks";
import { setPage } from "../../app/slices/general.slice";

/**
 *
 * this Component will return the children.
 * When it's rendered it'll set the global state:page to the given page.
 */
function SetPage({ page, children }: { page: string; children: ReactNode }) {
	const dispatch = useDispatch();
	const currPage = useSelector((state) => state.general.page);

	if (currPage !== page) {
		dispatch(setPage(page));
	}

	return <>{children}</>;
}

/**
 *
 * this function gets element, page and middleware
 *
 * it'll return the setPage react component with the given page and pass it the children
 *
 * it can also get a middleware.
 *
 * this middleware is mostly used in page verification.
 *
 * when trying to determine access rights to a certain page for a certain user
 *
 * A is a component that should receive children, it'll do its processing
 *
 * if and when it decides to render them it'll do it by itself
 *
 *
 * see: auth/authMiddleware for examples
 */
function SetPageRender(
	element: React.ReactNode,
	page: string,
	Middleware?: React.FunctionComponent<any>
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
