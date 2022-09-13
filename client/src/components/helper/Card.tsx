import React from "react";
import Filler from "./Filler";
import Loader from "./Loader";
import s from "./Helpers.module.scss";

type TProps = {
	title: string;
	children: React.ReactNode;
	className?: string;
	loader?: boolean;
	header_end?: React.ReactNode;
};

function Card(props: TProps) {
	return (
		<div className={`${props.className} ${s.card}`}>
			<div className={s.card_header}>
				<h3 className="title-2">{props.title}</h3>
				<div>{props.header_end}</div>
			</div>
			<div className={`${s.card_body} ${props.loader && s.card_loader}`}>
				{props.loader && (
					<>
						<div className={s.card_loader_container} tabIndex={0}>
							<div className={s.card_loader_inner}>
								<Loader></Loader>
							</div>
						</div>
						<Filler></Filler>
					</>
				)}
				{props.children}
			</div>
		</div>
	);
}

export default Card;
