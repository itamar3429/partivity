import { Button, IconButton, MenuItem, Stack, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import Card from "../../helper/Card";
import s from "./C.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import { services as totalServices } from "../../../api/providers/types";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import SearchForm, { TOption } from "../../helper/SearchForm";
import {
	addEventService,
	getAvailableDates,
	getServicesOptions,
	TServiceOptions,
} from "../../../api/client/events";
import AddServiceItem from "./AddServiceItem";
import { getDateString, removeTZOffset } from "../../../libs/dates";
import { useParams } from "react-router-dom";
import { errorToast } from "../../../libs/toast/error";
import { successToast } from "../../../libs/toast/success";

type TProps = {
	onHide: () => void;
	show: boolean;
	date: Date;
	setServices: (services: any) => any;
};

export type TServiceOption = TServiceOptions & {
	image: string;
	start: Date;
	end: Date;
	schedule_id: number;
};

function AddService(props: TProps) {
	const [service, setService] = useState(0);
	const [date, setDate] = useState(new Date(props.date));
	const [serviceType, setServiceType] = useState("");
	const [serviceOptions, setServiceOptions] = useState<TServiceOption[]>([]);
	const [serviceTypeOptions, setServiceTypeOptions] = useState<TOption[]>([]);
	const [dates, setDates] = useState<string[]>([]);
	const [servicesArr, setServicesArr] = useState<TServiceOption[]>([]);
	const [loading, setLoading] = useState(false);
	const [selectedSchedule, setSelectedSchedule] = useState<null | number>(
		null
	);

	const { eventId } = useParams();

	const services = totalServices.filter((service) =>
		serviceOptions.find((x) => x.service === service)
	);

	useEffect(() => {
		loadServiceOptions(removeTZOffset(date));
	}, [date]);

	useEffect(() => {
		getAvailableDates().then((res) => {
			if (res.success) {
				setDates(res.dates);
			} else {
				errorToast(res.message);
			}
		});
	}, []);

	useEffect(() => {
		const options = serviceOptions
			.filter((x) => x.service === services[service])
			.map((x) => ({
				id: x.id,
				label: x.service_type,
			}));

		setServiceTypeOptions(
			options.filter(
				(x, i) => i === options.findIndex((y) => x.label === y.label)
			)
		);
		setSelectedSchedule(null);
		const temp = serviceOptions.filter(
			(opt) =>
				opt.service === services[service] &&
				opt.service_type.includes(serviceType)
		);
		setServicesArr(temp);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [serviceOptions, service]);

	useEffect(() => {
		const temp = serviceOptions.filter(
			(opt) =>
				opt.service === services[service] &&
				opt.service_type.includes(serviceType)
		);
		setServicesArr(temp);

		setSelectedSchedule(null);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [serviceType]);

	const loadServiceOptions = async (date: Date) => {
		setLoading(true);
		try {
			const res = await getServicesOptions(date);
			if (res.success) {
				setServiceOptions(res.services as any);
			} else {
				errorToast(res.message);
			}
		} catch (error) {}
		setLoading(false);
	};

	const onSelect = (scheduleId: number) => {
		setSelectedSchedule(scheduleId);
	};

	return (
		<Modal
			show={props.show}
			onHide={props.onHide}
			dialogClassName={s.add_service_modal}
		>
			<Card
				loader={loading}
				title="add service"
				className={s.add_service_card}
				header_end={
					<IconButton onClick={props.onHide}>
						<CloseIcon></CloseIcon>
					</IconButton>
				}
			>
				<Stack
					spacing={0}
					direction={"row"}
					style={{
						flexWrap: "wrap",
						gap: 25,
						padding: 20,
					}}
					className="card-border"
				>
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
							shouldDisableDate={(date) => {
								const include = !dates.some((d) => {
									return (
										getDateString(removeTZOffset(date)) ===
										getDateString(removeTZOffset(new Date(d)))
									);
								});
								return include;
							}}
						/>
					</LocalizationProvider>
					<TextField
						onChange={(select) => {
							const val = Number(select.target.value);
							setService(val);
						}}
						className={s.add_service_input}
						select
						label="Service"
						name="service"
						helperText="Please select a service type"
						required
						value={service}
					>
						{services.length
							? services.map((option, i) => (
									<MenuItem key={i} value={i}>
										{option}
									</MenuItem>
							  ))
							: [
									<MenuItem key={0} value={0}>
										no services on this date
									</MenuItem>,
							  ]}
					</TextField>
					<SearchForm
						setText={setServiceType}
						options={serviceTypeOptions}
						text={serviceType}
						label={"service type"}
						width={"100%"}
						highlight
					></SearchForm>
				</Stack>
				<div className={s.services}>
					{servicesArr.map((s) => (
						<AddServiceItem
							service={s}
							onSelect={onSelect}
							selected={s.schedule_id === selectedSchedule}
						></AddServiceItem>
					))}
				</div>
				<div
					style={{
						display: "flex",
						justifyContent: "flex-end",
						padding: "10px 20px",
					}}
				>
					<Button
						color="success"
						onClick={async () => {
							if (selectedSchedule) {
								setLoading(true);
								const res = await addEventService({
									eventId: Number(eventId),
									scheduleId: Number(selectedSchedule),
								});
								if (res.success) {
									props.setServices(res.services);
									props.onHide();
									successToast("event service added successfully");
								} else {
									errorToast(res.message);
								}
								setLoading(false);
							}
						}}
					>
						Save
					</Button>
				</div>
			</Card>
		</Modal>
	);
}

export default AddService;
