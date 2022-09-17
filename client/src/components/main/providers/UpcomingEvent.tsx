import { Button, Tooltip } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import s from "./P.module.scss";

type TProps = {
	event: any;
};
function UpcomingEvent(props: TProps) {
	const { event } = props;
	const date = new Date(event.start).toDateString();
	const time1 = new Date(event.start)
		.toTimeString()
		.split(" ")[0]
		.replace(":", "-")
		.split(":")[0]
		.replace("-", ":");
	const time2 = new Date(event.start).toTimeString();
	return (
		<div className={s.upcoming_item}>
			<div className={s.info}>
				{date} -{" "}
				<Tooltip title={time2}>
					<span>{time1}</span>
				</Tooltip>{" "}
				<div>
					<span>{event.event_title}</span> -{" "}
					<span>{event.event_description}</span>
				</div>
			</div>
			<Link
				to={"/event/invite/" + event.event_id}
				className="link"
				style={{ display: "flex" }}
			>
				<Button className={s.button}>view</Button>
			</Link>
		</div>
	);
}

export default UpcomingEvent;
