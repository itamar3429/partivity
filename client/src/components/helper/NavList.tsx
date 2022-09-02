import React from "react";
import { useSelector } from "../../redux/hooks";

function NavList(props: React.PropsWithChildren) {
	const showWide =
		useSelector((state) => state.nav.showWide) ||
		document.body.clientWidth < 1000;
	return (
		<nav>
			<ul className={"nav-list-el" + (!showWide ? " narrow" : "")}>
				{props.children}
			</ul>
		</nav>
	);
}

export default NavList;
