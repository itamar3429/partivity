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
import { removeTZOffset } from "../../../../libs/dates";

type TProps = {
	show?: boolean;
	hide: Function;
	onSubmit: (
		title: string,
		price: number,
		dateFrom: Date,
		dateTo: Date,
		timeFrom: Date,
		timeTo: Date
	) => any;
	from?: Date;
	to?: Date;
	title?: string;
	timeStart?: Date;
	timeEnd?: Date;
};

function AddEvent(props: TProps) {
	const [title, setTitle] = useState(props.title || "");
	const [from, setFrom] = useState(props.from || new Date());
	const [to, setTo] = useState(props.to || new Date());
	const [timeStart, setTimeStart] = useState(props.timeStart || new Date());
	const [timeEnd, setTimeEnd] = useState(props.timeEnd || new Date());
	const [price, setPrice] = useState(0);

	return (
		<Modal show={props.show} onHide={() => props.hide()}>
			<Card title="add event" className={s.add_event_card}>
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
						<label htmlFor="title">date from:</label>
						<LocalizationProvider dateAdapter={AdapterDateFns}>
							<DesktopDatePicker
								renderInput={(params) => <TextField {...params} />}
								inputFormat="dd/MM/yyyy"
								label="Date From"
								value={from}
								onChange={(value) => {
									setFrom(value || new Date());
								}}
								maxDate={to}
							/>
						</LocalizationProvider>
					</div>
					<div className={s.input_group}>
						<label htmlFor="title">date to:</label>
						<LocalizationProvider dateAdapter={AdapterDateFns}>
							<DesktopDatePicker
								renderInput={(params) => <TextField {...params} />}
								inputFormat="dd/MM/yyyy"
								label="Date To"
								value={to}
								onChange={(value) => {
									setTo(value || new Date());
								}}
								minDate={from}
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
									setTimeStart(val || new Date());
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
									setTimeEnd((val as any)?.$d || new Date());
								}}
								renderInput={(params) => <TextField {...params} />}
							/>
						</LocalizationProvider>
					</div>
				</div>
				<div className={s.submit_btn}>
					<Button
						onClick={() => {
							props.onSubmit(
								title,
								price,
								new Date(
									removeTZOffset(from).toISOString().split("T")[0]
								),
								new Date(
									removeTZOffset(to).toISOString().split("T")[0]
								),
								new Date(timeStart),
								new Date(timeEnd)
							);
						}}
					>
						Add
					</Button>
				</div>
			</Card>
		</Modal>
	);
}

export default AddEvent;
