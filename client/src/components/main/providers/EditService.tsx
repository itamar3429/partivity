// import { Block } from "@mui/icons-material";
import {
	DialogTitle,
	// FormControl,
	// InputLabel,
	// Select,
	MenuItem,
	TextField,
} from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import editService from "../../../api/providers/editService";
import { getService } from "../../../api/providers/getServices";
import { useDispatch } from "../../../app/hooks";
import Card from "../../helper/Card";
import { TransitionRedirect } from "../../helper/Link";
import Template from "../template/Template";
import s from "./P.module.scss";

export const services = ["location", "music", "food", "general"] as const;

function EditService() {
	const [service, setService] = useState(0);
	const [capacity, setCapacity] = useState<number>(0);
	const [type, setType] = useState("");
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("\n");
	const [country, setCountry] = useState("");
	const [city, setCity] = useState("");
	const [address, setAddress] = useState("");
	const [name, setName] = useState("");
	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const params = useParams();

	const showCapacity = ["location", "general"].includes(services[service]);
	const showAddress = ["location"].includes(services[service]);

	useEffect(() => {
		setLoading(true);
		getService(serviceId).then((res) => {
			if (res.success && res.service) {
				const service = res.service;
				setService(services.indexOf(service.service));
				setCapacity(service.capacity || "");
				setType(service.service_type || "");
				setTitle(service.title || "");
				setDescription(service.description || "");
				setCountry(service.country || "");
				setCity(service.city || "");
				setAddress(service.address || "");
				setName(service.name || "");
			}
			setLoading(false);
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const serviceId = Number(params.service_id);
	if (isNaN(serviceId)) {
		return <Navigate to={"/providers"}></Navigate>;
	}

	return (
		<Template>
			<Card
				title="edit service"
				className={s["add-service-card"]}
				loader={loading}
			>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						setLoading(true);
						const chosenService = services[service];
						editService(
							{
								service: chosenService,
								description,
								service_type: type,
								title,
								capacity: showCapacity ? capacity : undefined,
								address: showAddress ? address : undefined,
								city: showAddress ? city : undefined,
								country: showAddress ? country : undefined,
								name: name,
							},
							serviceId
						).then((res) => {
							console.log(res);

							if (res.success) {
								TransitionRedirect("/providers/", dispatch, navigate);
							}
							setLoading(false);
						});
					}}
				>
					<div
						className={"card-border"}
						style={{
							margin: 20,
							padding: 10,
							paddingBottom: 30,
						}}
					>
						<Stack spacing={5}>
							<Stack
								spacing={0}
								direction={"row"}
								style={{
									flexWrap: "wrap",
									gap: 25,
								}}
							>
								<TextField
									style={{ width: "50%", minWidth: 200 }}
									onChange={(select) => {
										const val = Number(select.target.value);
										setService(val);
									}}
									className={s["add-service-input"]}
									select
									label="Service"
									name="service"
									helperText="Please select a service type"
									disabled
									value={service}
								>
									{services.map((option, i) => (
										<MenuItem key={i} value={i}>
											{option}
										</MenuItem>
									))}
								</TextField>

								{showCapacity && (
									<TextField
										label="Capacity"
										placeholder="Capacity"
										value={capacity}
										style={{ minWidth: 200 }}
										className={s["add-service-input"]}
										onChange={(e) => {
											const val = Number(e.currentTarget.value);
											if (val >= 0) setCapacity(val || 0);
										}}
										inputProps={{
											inputMode: "numeric",
											type: "number",
										}}
										name="capacity"
										required={showCapacity}
									/>
								)}
							</Stack>
							<Stack
								spacing={0}
								direction={"row"}
								style={{
									flexWrap: "wrap",
									gap: 25,
								}}
							>
								<TextField
									label="business name"
									placeholder="name of your business"
									value={name}
									style={{ width: 300, minWidth: 200 }}
									className={s["add-service-input"]}
									onChange={(e) => {
										const val = e.currentTarget.value;
										setName(val);
									}}
									inputProps={{
										inputMode: "text",
										type: "text",
									}}
									name="type"
									required={services[service] !== "general"}
								/>
								<TextField
									label="Service Type"
									placeholder="Service Specific Type"
									value={type}
									style={{ width: "300px", minWidth: "200px" }}
									className={s["add-service-input"]}
									onChange={(e) => {
										const val = e.currentTarget.value;
										setType(val);
									}}
									inputProps={{
										inputMode: "text",
										type: "text",
										pattern: ".{4,}",
										title: "required. at least 4 characters",
									}}
									name="type"
									required
								/>
							</Stack>
							<TextField
								label="Title"
								placeholder="Title"
								value={title}
								style={{ width: "90%", minWidth: "200px" }}
								className={s["add-service-input"]}
								onChange={(e) => {
									const val = e.currentTarget.value;
									setTitle(val);
								}}
								inputProps={{
									inputMode: "text",
									type: "text",
									pattern: ".{5,}",
									title: "required. at least 5 characters",
								}}
								name="title"
								required
							/>
							<div style={{ position: "relative" }}>
								<TextField
									label="Description"
									placeholder="Description"
									value={description}
									style={{ width: "90%", minWidth: "200px" }}
									className={s["add-service-input"]}
									onChange={(e) => {
										const val = e.currentTarget.value;
										setDescription(val);
									}}
									inputProps={{
										inputMode: "text",
										type: "text",
										pattern: ".{15,}",
										title: "required. at least 15 characters",
										required: true,
									}}
									name="description"
									required
									multiline
								/>
								<TextField
									value={description}
									style={{
										opacity: 0,
										overflow: "hidden",
										marginTop: 0,
										position: "absolute",
										width: "100%",
										minWidth: "100%",
										bottom: 0,
										left: 0,
										zIndex: -1,
									}}
									className={s["add-service-input"]}
									inputProps={{
										inputMode: "text",
										type: "text",
										pattern: ".{15,}",
										title: "required. at least 15 characters",
										hidden: true,
									}}
									name="description"
									required
									hidden
								/>
							</div>
						</Stack>
					</div>
					{showAddress && (
						<div
							className="card-border"
							style={{
								margin: 20,
								padding: 10,
								paddingBottom: 30,
							}}
						>
							<DialogTitle>Address</DialogTitle>
							<Stack
								spacing={0}
								direction={"row"}
								style={{
									flexWrap: "wrap",
									gap: 25,
								}}
							>
								<TextField
									label="Country"
									placeholder="Country"
									value={country}
									style={{ width: "300px", minWidth: 200 }}
									onChange={(e) => {
										const val = e.currentTarget.value;
										setCountry(val);
									}}
									inputProps={{
										inputMode: "text",
										type: "text",
									}}
									className={s["add-service-input"]}
									name="country"
									required
								/>
								<TextField
									label="City"
									placeholder="City"
									value={city}
									style={{ width: "300px", minWidth: 200 }}
									onChange={(e) => {
										const val = e.currentTarget.value;
										setCity(val);
									}}
									inputProps={{
										inputMode: "text",
										type: "text",
									}}
									className={s["add-service-input"]}
									name="city"
									required
								/>
								<TextField
									label="Address"
									placeholder="Address"
									value={address}
									style={{ width: "300px", minWidth: 200 }}
									onChange={(e) => {
										const val = e.currentTarget.value;
										setAddress(val);
									}}
									inputProps={{
										inputMode: "text",
										type: "text",
									}}
									className={s["add-service-input"]}
									name="address"
									required
								/>
							</Stack>
						</div>
					)}

					<div
						// className="card-border"
						style={{
							margin: 20,
							padding: 10,
							paddingBottom: 30,
							display: "flex",
							justifyContent: "flex-end",
						}}
					>
						<button className="button green outline" type="submit">
							Submit
						</button>
					</div>
				</form>
			</Card>
		</Template>
	);
}

export default EditService;
