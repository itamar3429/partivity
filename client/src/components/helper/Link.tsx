import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "../../redux/hooks";
import {
	fadeOut,
	fadeIn,
	clearTransitionThunk,
} from "../../redux/slices/link.slice";

type TProps = {
	to: string;
	className?: string;
	style?: React.CSSProperties;
	onClick?: Function;
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
					dispatch(fadeOut());
					setTimeout(() => {
						dispatch(fadeIn());
						dispatch(clearTransitionThunk(500));
						navigate(props.to);
					}, 500);
				}
			}}
		>
			{props.children}
		</a>
	);
};

export default CustomLink;
