import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { api } from "../../../config";
import { TServiceOption } from "./AddService";
import s from "./C.module.scss";

type TProps = {
	service: TServiceOption;
	onSelect: (scheduleId: number) => any;
	selected?: boolean;
};

function AddServiceItem(props: TProps) {
	return (
		<div className={`${s.service_item} ${props.selected ? s.selected : ""}`}>
			<img
				className={s.img}
				src={
					props.service.image
						? `${api.host}/storage/get/${props.service.image}`
						: "/img/image-not-found.png"
				}
				alt="about service"
			/>
			<div className={s.details}>
				<h1 className={s.name}>{props.service.name}</h1>
				<h2 className={s.title}>{props.service.title}</h2>
				<h3 className={s.date}>
					{new Date(props.service.start).toLocaleDateString("he-IL")} -{" "}
					{new Date(props.service.start).toLocaleTimeString("he-IL")}
				</h3>
				<Link to={"/service/" + props.service.id}>
					<Button variant="contained" size="small">
						view
					</Button>
				</Link>
				<div style={{ marginTop: 7 }}>
					<Button
						variant="contained"
						color="success"
						size="small"
						onClick={() => props.onSelect(props.service.schedule_id)}
					>
						select
					</Button>
				</div>
			</div>
		</div>
	);
}

export default AddServiceItem;
