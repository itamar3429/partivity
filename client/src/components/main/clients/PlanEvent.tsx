import { Button, Stack, TextField, Tooltip } from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import React, { useState } from "react";
import Card from "../../helper/Card";
import Template from "../template/Template";
import s from "./C.module.scss";
import InfoIcon from "@mui/icons-material/Info";
import { addEvent } from "../../../api/client/events";
import { useDispatch } from "../../../app/hooks";
import { useNavigate } from "react-router-dom";
import { TransitionRedirect } from "../../helper/Link";
import { errorToast } from "../../../libs/toast/error";
// name title description status
function PlanEvent() {
	const [name, setName] = useState("");
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [date, setDate] = useState(new Date());

	const dispatch = useDispatch();
	const navigate = useNavigate();

	return (
		<Template>
			<Card title="plan your event" className={s.card}>
				<form
					onSubmit={async (e) => {
						e.preventDefault();
						const res = await addEvent({
							date,
							description,
							title,
							name,
						});
						if (res.success) {
							TransitionRedirect(
								"/event/edit/" + res.event.id,
								dispatch,
								navigate
							);
						} else {
							console.log(res);
							errorToast(res.message);
						}
					}}
				>
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
							<Tooltip title={"date can be change later"}>
								<InfoIcon color="warning" />
							</Tooltip>
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
						<Button color="success" variant="contained" type="submit">
							Create
						</Button>
					</div>
				</form>
			</Card>
		</Template>
	);
}

export default PlanEvent;
