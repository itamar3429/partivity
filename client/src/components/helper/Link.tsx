import React from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useDispatch } from "../../app/hooks";
import {
	fadeOut,
	fadeIn,
	clearTransitionThunk,
} from "../../app/slices/link.slice";

type TProps = {
	to: string;
	className?: string;
	style?: React.CSSProperties;
	onClick?: Function;
};
/**
 *
 * this component is integrated within the context of the application.
 *
 * it provides the ability to have a link that will animate when clicked.
 *
 * it'll fade out the page where it's clicked and then fade in the new page
 */
export const TransitionRedirect = (
	to: any,
	dispatch: ReturnType<typeof useDispatch>,
	navigate: NavigateFunction,
	ms = 500
) => {
	dispatch(fadeOut());
	setTimeout(() => {
		dispatch(fadeIn());
		dispatch(clearTransitionThunk(ms));
		navigate(to);
	}, ms);
};

const CustomLink = (props: React.PropsWithChildren<TProps>) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	return (
		<a
			href={props.to}
			className={props.className}
			style={props.style || {}}
			onClick={(e) => {
				e.preventDefault();
				props.onClick && props.onClick();
				const pathname = window.location.pathname + window.location.search;
				const href = window.location.href;
				const isDiff = props.to !== pathname && props.to !== href;

				if (isDiff) {
					TransitionRedirect(props.to, dispatch, navigate);
				}
			}}
		>
			{props.children}
		</a>
	);
};

export default CustomLink;
