import React, { useEffect, useState } from "react";
import Template from "../../Template";
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
			const currDateFrom = new Date(dateFrom);
			const currDateTo = new Date(dateFrom);
			currDateFrom.setHours(timeFrom.getHours());
			currDateFrom.setMinutes(timeFrom.getMinutes());
			currDateTo.setHours(timeTo.getHours());
			currDateTo.setMinutes(timeTo.getMinutes());
			if (currDateFrom.getTime() > currDateTo.getTime())
				currDateTo.setDate(currDateTo.getDate() + 1);
			scheduleArr.push({
				start: currDateFrom,
				end: currDateTo,
				title,
				price,
				serviceId,
			});
			dateFrom.setDate(dateFrom.getDate() + 1);
		}
		const res = await addSchedules(serviceId, scheduleArr);
		if (res.success) {
			reloadSchedule();
			setShowAdd(false);
		} else {
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
		const res = await editSchedules(id, {
			title,
			end,
			price,
			start,
			serviceId,
		});
		if (res.success) {
			reloadSchedule();
			setShowEdit(false);
		} else {
		}
	};

	const deleteEvent = async (id: number) => {
		const res = await deleteSchedule(id);
		if (res.success) {
			setEvents((pre) => pre.filter((event) => event.id !== id));
			setShowEdit(false);
			setEditId(0);
		} else {
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
						titleAccessor={(e) => e.title || "empty title"}
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
						popup
					/>
				</div>
			</Card>
		</Template>
	);
}

export default Schedule;
