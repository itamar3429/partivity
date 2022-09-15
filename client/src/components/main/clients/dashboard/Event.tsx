import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import s from "./Dashboard.module.scss";

type TProps = {
	event: {
		date: string;
		description: string;
		id: number;
		name: string;
		status: "pending" | "booked";
		title: string;
	};
	buttonText?: string;
};

function Event(props: TProps) {
	const { event } = props;

	return (
		<div className={s.event}>
			<h3>{event.name}</h3>
			<h4>{event.title}</h4>
			<h6>{event.description}</h6>
			<p>
				<b>date: </b> {event.date}
			</p>
			<Link to={`/event/edit/${event.id}`} className="link">
				<Button color="info" variant="outlined">
					{props.buttonText || "edit/view"}
				</Button>
			</Link>
		</div>
	);
}

export default Event;
