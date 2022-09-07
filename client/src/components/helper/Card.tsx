import React from "react";
import Filler from "./Filler";
import Loader from "./Loader";

type TProps = {
	title: string;
	children: React.ReactNode;
	className?: string;
	loader?: boolean;
};

function Card(props: TProps) {
	return (
		<div className={"card " + props.className}>
			<div className="card-header">
				<h3 className="title-2">{props.title}</h3>
			</div>
			{/* {props.loader && ( */}
			<div className={"card-body" + (props.loader && " card-loader")}>
				{props.loader && (
					<>
						<div className="card-loader-container" tabIndex={0}>
							<div className="card-loader-inner">
								<Loader></Loader>
							</div>
						</div>
						<Filler></Filler>
					</>
				)}
				{props.children}
			</div>
			{/* )} */}
			{/* {!props.loader && <div className="card-body">{props.children}</div>} */}
		</div>
	);
}

export default Card;
