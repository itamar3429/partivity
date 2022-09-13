import { Button, Stack, TextField } from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEvent, updateEvent } from "../../../api/client/events";
import Card from "../../helper/Card";
import Template from "../template/Template";
import s from "./C.module.scss";

function EditEvent() {
	const [name, setName] = useState("");
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [date, setDate] = useState(new Date());
	const [services, setServices] = useState([]);
	const [loading, setLoading] = useState(false);

	const { eventId } = useParams();

	useEffect(() => {
		loadEvent();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const loadEvent = async () => {
		setLoading(true);
		try {
			const res = await getEvent(Number(eventId));
			if (res.success) {
				const { event } = res;
				setName(event.name);
				setTitle(event.title);
				setDescription(event.description);
				setDate(new Date(event.date));
				setServices(event.services);
			}
		} catch (error) {
			console.log(error);
		}
		setLoading(false);
	};

	return (
		<Template>
			<Card title="edit event" className={s.card} loader={loading}>
				<div>
					<div
						className="card-border"
						style={{
							margin: 20,
							padding: 10,
							paddingBottom: 30,
						}}
					>
						<Stack
							spacing={0}
							direction={"row"}
							style={{
								flexWrap: "wrap",
								gap: 25,
							}}
						>
							<TextField
								label="event name"
								placeholder="Name of your event"
								value={name}
								style={{ flex: 1, minWidth: 200 }}
								onChange={(e) => {
									const val = e.currentTarget.value;
									setName(val);
								}}
								inputProps={{
									inputMode: "text",
									type: "text",
								}}
								name="type"
							/>
							<TextField
								label="title"
								placeholder="Title of your event"
								value={title}
								style={{ flex: 1, minWidth: 200 }}
								onChange={(e) => {
									const val = e.currentTarget.value;
									setTitle(val);
								}}
								inputProps={{
									inputMode: "text",
									type: "text",
								}}
								name="type"
							/>
							<TextField
								label="Description"
								placeholder="Description"
								value={description}
								style={{ width: "100%" }}
								onChange={(e) => {
									const val = e.currentTarget.value;
									setDescription(val);
								}}
								inputProps={{
									inputMode: "text",
									type: "text",
									pattern: ".{15,}",
								}}
								name="description"
								multiline
							/>
							<LocalizationProvider dateAdapter={AdapterDateFns}>
								<DesktopDatePicker
									renderInput={(params) => <TextField {...params} />}
									inputFormat="dd/MM/yyyy"
									label="Event Date"
									value={date}
									onChange={(value) => {
										setDate(value || new Date());
									}}
									minDate={new Date()}
								/>
							</LocalizationProvider>
						</Stack>

						<div style={{ position: "relative" }}></div>
					</div>

					<div
						style={{
							margin: 20,
							padding: 10,
							paddingBottom: 30,
							display: "flex",
							justifyContent: "flex-end",
						}}
					>
						<button
							className="button green outline"
							type="submit"
							onClick={async (e) => {
								const res = await updateEvent(Number(eventId), {
									date,
									description,
									name,
									title,
								});
								if (res.success) {
									console.log("updated");
								} else {
									console.log(res);
								}
							}}
						>
							Save
						</button>
					</div>
				</div>
			</Card>

			<Card
				title="event services"
				loader={loading}
				header_end={<Button>Add</Button>}
				className={s.card}
			>
				{!services.length && (
					<p style={{ textAlign: "center", padding: 30 }}>no services</p>
				)}
			</Card>
		</Template>
	);
}

export default EditEvent;
