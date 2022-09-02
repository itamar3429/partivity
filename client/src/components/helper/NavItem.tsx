import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "../../redux/hooks";
import { close } from "../../redux/slices/nav.slice";

type TProps = {
	to?: string;
	title: string;
	icon?: React.ReactElement;
};

function NavItem(props: React.PropsWithChildren<TProps>) {
	const dispatch = useDispatch();
	const closeNav = () => dispatch(close());
	const showWide =
		useSelector((state) => state.nav.showWide) ||
		document.body.clientWidth < 1000;

	return (
		<li className={"nav-item" + (!showWide ? " icon-only" : "")}>
			<Link
				to={props.to || ""}
				onClick={closeNav}
				className="link nev-item-link"
			>
				{showWide ? (
					<>
						{props.icon || <div className="fill-icon"></div>}
						<span className="item-text">{props.title}</span>
					</>
				) : (
					<>
						<div className="icon-only">{props.icon}</div>
					</>
				)}
			</Link>
			{props.children}
		</li>
	);
}

export default NavItem;
