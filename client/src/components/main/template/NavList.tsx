import React from "react";
import { useSelector } from "../../../app/hooks";
import s from "./T.module.scss";

function NavList(props: React.PropsWithChildren) {
	const showWide =
		useSelector((state) => state.nav.showWide) ||
		document.body.clientWidth < 1000;
	return (
		<nav>
			<ul className={`${s.nav_list_el} ${!showWide ? s.narrow : ""}`}>
				{props.children}
			</ul>
		</nav>
	);
}

export default NavList;
