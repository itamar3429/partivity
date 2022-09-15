import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import Card from "../../../helper/Card";
import s from "./S.module.scss";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Button, TextField } from "@mui/material";
import { DesktopTimePicker } from "@mui/x-date-pickers";
import { TSchedule } from "../../../../api/providers/schedule";
import { removeTZOffset } from "../../../../libs/dates";

type TProps = {
	show?: boolean;
	hide: Function;
	onSubmit: Function;
	schedule: TSchedule & { id: number };
	serviceId: number;
	onDelete: Function;
};

function EditEvent(props: TProps) {
	const [title, setTitle] = useState(props.schedule.title || "");
	const [date, setDate] = useState(props.schedule.start);
	const [timeStart, setTimeStart] = useState(props.schedule.start);
	const [timeEnd, setTimeEnd] = useState(props.schedule.end);
	const [price, setPrice] = useState(props.schedule.price);
	const eventId = props.schedule.id;

	return (
		<Modal show={props.show} onHide={() => props.hide()}>
			<Card title="edit event" className={s.add_event_card}>
				<div className="card-border">
					<div className={s.input_group}>
						<label htmlFor="title">title:</label>
						<TextField
							type="text"
							className="input"
							label="Title"
							value={title}
							onChange={(e) => setTitle(e.currentTarget.value)}
							required
						/>
					</div>
					<div className={s.input_group}>
						<label htmlFor="title">price:</label>
						<TextField
							type="number"
							className="input"
							label="Price"
							value={price}
							onChange={(e) => {
								const price = Number(e.currentTarget.value);
								setPrice(price >= 0 ? price : 0);
							}}
						/>
					</div>
					<div className={s.input_group}>
						<label htmlFor="date">date from:</label>
						<LocalizationProvider dateAdapter={AdapterDateFns}>
							<DesktopDatePicker
								renderInput={(params) => <TextField {...params} />}
								inputFormat="dd/MM/yyyy"
								label="Date"
								value={date}
								onChange={(value) => {
									setDate(value || new Date());
								}}
							/>
						</LocalizationProvider>
					</div>

					<div className={s.input_group}>
						<label htmlFor="time-from">time from:</label>
						<LocalizationProvider dateAdapter={AdapterDayjs}>
							<DesktopTimePicker
								label="Time From"
								value={timeStart}
								onChange={(val) => {
									setTimeStart(new Date(val || Date.now()));
								}}
								renderInput={(params) => <TextField {...params} />}
							/>
						</LocalizationProvider>
					</div>
					<div className={s.input_group}>
						<label htmlFor="time-to">time to:</label>
						<LocalizationProvider dateAdapter={AdapterDayjs}>
							<DesktopTimePicker
								label="Time To"
								value={timeEnd}
								onChange={(val) => {
									setTimeEnd(new Date(val || Date.now()));
								}}
								renderInput={(params) => <TextField {...params} />}
							/>
						</LocalizationProvider>
					</div>
				</div>
				<div className={s.submit_btn}>
					<Button
						onClick={() => {
							const start = removeTZOffset(date);
							const end = removeTZOffset(date);
							start.setHours(timeStart.getHours());
							start.setMinutes(timeStart.getMinutes());

							end.setHours(timeEnd.getHours());
							end.setMinutes(timeEnd.getMinutes());

							props.onSubmit({
								title,
								price,
								start,
								end,
								id: eventId,
								serviceId: props.serviceId,
							});
						}}
					>
						Edit
					</Button>
					<Button
						color="error"
						onClick={() => {
							props.onDelete(eventId);
						}}
					>
						Delete
					</Button>
				</div>
			</Card>
		</Modal>
	);
}

export default EditEvent;
