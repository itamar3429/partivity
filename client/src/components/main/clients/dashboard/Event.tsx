import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { successToast } from "../../../../libs/toast/success";
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

	// const inviteText = useRef<HTMLInputElement>(null);
	const invite = `${window.location.protocol}//${window.location.host}/event/invite/${event.id}`;

	return (
		<div className={s.event}>
			<h3>{event.name}</h3>
			<h4>{event.title}</h4>
			<span>{event.description}</span>
			<p>
				<b>date: </b> {event.date}
			</p>
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					gap: 20,
					flexWrap: "wrap",
				}}
			>
				<Link to={`/event/edit/${event.id}`} className="link">
					<Button color="info" variant="outlined">
						{props.buttonText || "edit/view"}
					</Button>
				</Link>
				{event.status === "booked" && (
					<Button
						color="info"
						variant="outlined"
						onClick={(e) => {
							navigator.clipboard.writeText(invite);
							successToast("Invitation link copied");
						}}
					>
						copy invitation
					</Button>
				)}
			</div>
		</div>
	);
}

export default Event;
