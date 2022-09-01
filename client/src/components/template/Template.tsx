import React from "react";

type TProps = {};

function Template(props: React.PropsWithChildren<TProps>) {
	return <>{props.children}</>;
}

export default Template;
