import React from "react";

type TProps = {
	title: string;
	children: React.ReactNode;
	className?: string;
};

function Card(props: TProps) {
	return (
		<div className={"card " + props.className}>
			<div className="card-header">
				<h1>{props.title}</h1>
			</div>
			<div className="card-body">{props.children}</div>
		</div>
	);
}

export default Card;
