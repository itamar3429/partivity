import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "../../../app/hooks";
import { close } from "../../../app/slices/nav.slice";
import s from "./T.module.scss";

type TProps = {
	to?: string;
	title: string;
	icon?: React.ReactElement;
	page: string;
};

function NavItem(props: React.PropsWithChildren<TProps>) {
	const dispatch = useDispatch();
	const closeNav = () => dispatch(close());

	const showWide =
		useSelector((state) => state.nav.showWide) ||
		document.body.clientWidth < 1000;
	const page = useSelector((state) => state.general.page);

	return (
		<li
			className={`${s.nav_item} ${!showWide ? s.icon_only : ""} ${
				page === props.page ? s.selected : ""
			}`}
		>
			<Link
				to={props.to || ""}
				onClick={closeNav}
				className={`link ${s.nav_item_link}`}
			>
				{showWide ? (
					<>
						{props.icon || <div className={s.fill_icon}></div>}
						<span className={s.item_text}>{props.title}</span>
					</>
				) : (
					<>
						<div className={s.icon_only}>{props.icon}</div>
					</>
				)}
			</Link>
			{props.children}
		</li>
	);
}

export default NavItem;
