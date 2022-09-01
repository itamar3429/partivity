import React from "react";
import { useSelector } from "../../redux/hooks";

type TProps = {};

function Template(props: React.PropsWithChildren<TProps>) {
	const className = useSelector((state) => state.transition.className);

	return <div className={className}>{props.children}</div>;
}

export default Template;
