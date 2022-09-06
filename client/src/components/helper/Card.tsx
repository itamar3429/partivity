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
				<h3 className="title-2">{props.title}</h3>
			</div>
			<div className="card-body">{props.children}</div>
		</div>
	);
}

export default Card;
