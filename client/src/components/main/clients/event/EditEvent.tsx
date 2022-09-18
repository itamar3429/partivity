import { Button, Stack, TextField, Tooltip } from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
	getEvent,
	removeEventService,
	updateEvent,
} from "../../../../api/client/events";
import { errorToast } from "../../../../libs/toast/error";
import { successToast } from "../../../../libs/toast/success";
import Card from "../../../helper/Card";
import Template from "../../template/Template";
import AddService from "./eventService/AddService";
import s from "./event.module.scss";
import EventSubmitModal from "./EventSubmitModal";
import Service from "./Service";

function EditEvent() {
	const [name, setName] = useState("");
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [date, setDate] = useState(new Date());
	const [services, setServices] = useState<any[]>([]);
	const [loading, setLoading] = useState(false);
	const [status, setStatus] = useState("");
	const [showAddService, setShowAddService] = useState(false);
	const [showSubmitEvent, setShowSubmitEvent] = useState(false);

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
				setStatus(event.status);
			} else {
				errorToast(res.message);
			}
		} catch (error) {
			console.log(error);
			errorToast("something went wrong try again later");
		}
		setLoading(false);
	};

	const onServiceDelete = async (eventServiceId: number) => {
		const res = await removeEventService(eventServiceId);
		if (res.success) {
			setServices((pre) =>
				pre.filter((x) => x.event_service_id !== eventServiceId)
			);
			successToast("event service deleted successfully");
		} else {
			errorToast(res.message);
		}
	};

	const isNotBooked = status !== "booked";

	return (
		<Template>
			{showAddService && isNotBooked && (
				<AddService
					onHide={() => setShowAddService(false)}
					show={showAddService}
					date={date}
					setServices={setServices}
				/>
			)}
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
							{/* <TextField
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
							/> */}
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
						<span>
							<b>status: </b>
							{status}
						</span>

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
						<Button
							color={"success"}
							variant="contained"
							type="submit"
							onClick={async (e) => {
								if (isNotBooked) {
									const res = await updateEvent(Number(eventId), {
										date,
										description,
										name,
										title,
									});
									if (res.success) {
										successToast("event updated successfully");
									} else {
										console.log(res);
										errorToast(res.message);
									}
								}
							}}
							disabled={!isNotBooked}
						>
							Save
						</Button>
					</div>
				</div>
			</Card>

			<Card
				title="event services"
				loader={loading}
				header_end={
					<Button
						disabled={!isNotBooked}
						onClick={() => isNotBooked && setShowAddService(true)}
					>
						Add
					</Button>
				}
				className={s.card_bottom}
			>
				{services.map((service, i) => (
					<Service
						key={service.event_service_id}
						service={service}
						type={service.service}
						onDelete={onServiceDelete}
						booked={!isNotBooked}
					/>
				))}
				{!services.length ? (
					<p style={{ textAlign: "center", padding: 30 }}>no services</p>
				) : (
					<div
						style={{
							display: "flex",
							justifyContent: "flex-end",
							padding: "30px 20px",
							height: "fit-content",
						}}
					>
						<Tooltip
							title={
								isNotBooked
									? "after submitting you cannot cancel the event"
									: "event already booked"
							}
						>
							<span>
								<Button
									color="success"
									variant="contained"
									disabled={!isNotBooked}
									onClick={() => {
										isNotBooked && setShowSubmitEvent(true);
									}}
								>
									book
								</Button>
							</span>
						</Tooltip>
					</div>
				)}
			</Card>
			{showSubmitEvent && isNotBooked && (
				<EventSubmitModal
					show
					onHide={() => setShowSubmitEvent(false)}
					services={services}
					onSuccess={() => setStatus("booked")}
				/>
			)}
		</Template>
	);
}

export default EditEvent;
