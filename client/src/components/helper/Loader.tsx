import React from "react";

import s from "./Helpers.module.scss";
function Loader() {
	return (
		<ul className={s.loader}>
			<li className={s.loader_item}></li>
			<li className={s.loader_item}></li>
			<li className={s.loader_item}></li>
		</ul>
	);
}

export default Loader;
