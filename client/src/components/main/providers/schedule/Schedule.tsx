import React, { useEffect, useState } from "react";
import Template from "../../template/Template";
import s from "./S.module.scss";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { dateFnsLocalizer, Calendar } from "react-big-calendar";
// import { format, parse, startOfWeek, getDay } from "date-fns";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import Card from "../../../helper/Card";
import { Button } from "@mui/material";
import AddEvent from "./AddEvent";
import { useParams } from "react-router-dom";
import {
	addSchedules,
	deleteSchedule,
	editSchedules,
	getSchedule,
	TSchedule,
} from "../../../../api/providers/schedule";
import EditEvent from "./EditEvent";
import { errorToast } from "../../../../libs/toast/error";
import { successToast } from "../../../../libs/toast/success";

const locales = {
	"en-US": import("date-fns/locale/en-US"),
	// he: import("date-fns/locale/he"),
};

const localizer = dateFnsLocalizer({
	locales,
	format,
	parse,
	startOfWeek,
	getDay,
});

function Schedule() {
	const [showAdd, setShowAdd] = useState(false);
	const [showEdit, setShowEdit] = useState(false);
	const [editId, setEditId] = useState(0);
	const [events, setEvents] = useState<(TSchedule & { id: number })[]>([]);
	const [addDates, setAddDates] = useState({
		from: new Date(),
		to: new Date(),
		timeStart: new Date(),
		timeEnd: new Date(),
	});

	const params = useParams();
	const serviceId = Number(params.service_id);

	useEffect(() => {
		reloadSchedule();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const reloadSchedule = async () => {
		const res = await getSchedule(serviceId);
		if (res.success) {
			const events = res.schedules.map((x: any) => {
				x.start = new Date(x.start);
				x.end = new Date(x.end);
				return x;
			});
			setEvents(events);
		} else {
			errorToast(res.message);
		}
	};

	const addEvents = async (
		title: string,
		price: number,
		dateFrom: Date,
		dateTo: Date,
		timeFrom: Date,
		timeTo: Date
	) => {
		const scheduleArr = [];
		while (dateFrom.getTime() <= dateTo.getTime()) {
			const currDateStart = new Date(dateFrom);
			const currDateEnd = new Date(dateFrom);
			currDateStart.setHours(timeFrom.getHours());
			currDateStart.setMinutes(timeFrom.getMinutes());
			currDateEnd.setHours(timeTo.getHours());
			currDateEnd.setMinutes(timeTo.getMinutes());
			if (currDateStart.getTime() > currDateEnd.getTime())
				currDateEnd.setDate(currDateEnd.getDate() + 1);
			scheduleArr.push({
				start: currDateStart,
				end: currDateEnd,
				title,
				price,
				service_id: serviceId,
				booked: false,
			});
			dateFrom.setDate(dateFrom.getDate() + 1);
		}
		const res = await addSchedules(serviceId, scheduleArr);
		if (res.success) {
			reloadSchedule();
			setShowAdd(false);
			successToast("event schedule added successfully");
		} else {
			errorToast(res.message);
		}
	};

	const editEvent = async ({
		title,
		price,
		start,
		end,
		id,
	}: {
		title: string;
		price: number;
		start: Date;
		end: Date;
		id: number;
	}) => {
		if (start.getTime() > end.getTime()) end.setDate(end.getDate() + 1);
		const res = await editSchedules(id, {
			title,
			end,
			price,
			start,
			service_id: serviceId,
		});
		if (res.success) {
			reloadSchedule();
			setShowEdit(false);
			successToast("schedule edited successfully");
		} else {
			errorToast(res.message);
		}
	};

	const deleteEvent = async (id: number) => {
		const res = await deleteSchedule(id);
		if (res.success) {
			setEvents((pre) => pre.filter((event) => event.id !== id));
			setShowEdit(false);
			setEditId(0);
			successToast("schedule deleted successfully");
		} else {
			errorToast(res.message);
		}
	};

	return (
		<Template>
			{showAdd && (
				<AddEvent
					show
					hide={() => setShowAdd(false)}
					onSubmit={addEvents}
					from={addDates.from}
					to={addDates.to}
					timeStart={addDates.timeStart}
					timeEnd={addDates.timeEnd}
				/>
			)}
			{showEdit && (
				<EditEvent
					show={showEdit}
					hide={() => setShowEdit(false)}
					onSubmit={editEvent}
					schedule={events.find((event) => event.id === editId) as any}
					serviceId={serviceId}
					onDelete={deleteEvent}
				/>
			)}
			<Card title="schedule" className={s.card}>
				<div className={s.schedule}>
					<div className={s.top_bar}>
						<Button variant="contained" onClick={() => setShowAdd(true)}>
							Add
						</Button>
					</div>

					<Calendar
						localizer={localizer}
						selectable
						events={events}
						startAccessor="start"
						endAccessor="end"
						titleAccessor={(e) =>
							(e.title || "empty title") + (e.booked ? " - booked" : "")
						}
						style={{
							height: 500,
						}}
						onSelectEvent={(event) => {
							setShowEdit(true);
							setEditId(event.id);
						}}
						onSelectSlot={(slot) => {
							const end = slot.end;
							if (end.getDate() !== slot.start.getDate())
								end.setDate(end.getDate() - 1);
							const timeEnd = new Date(slot.start);
							timeEnd.setHours(end.getHours());
							timeEnd.setMinutes(end.getMinutes());

							setAddDates({
								from: slot.start,
								to: end,
								timeStart: slot.start,
								timeEnd: timeEnd,
							});
							setShowAdd(true);
						}}
						eventPropGetter={(event) => {
							if (new Date(event.start).getTime() < Date.now()) {
								return {
									style: {
										backgroundColor: "gray",
									},
								};
							}
							if (event.booked) {
								return {
									style: {
										backgroundColor: "green",
									},
								};
							}
							return {
								style: {
									backgroundColor: "#1976d2",
								},
							};
						}}
						popup
					/>
				</div>
			</Card>
		</Template>
	);
}

export default Schedule;
