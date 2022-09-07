import React from "react";
import { useNavigate } from "react-router-dom";
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

export const TransitionRedirect = (
	to: any,
	dispatch: any,
	navigate: any,
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
