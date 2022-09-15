import React, { useEffect, useState } from "react";
import { getDashboard } from "../../../../api/client/dashboard";
import { errorToast } from "../../../../libs/toast/error";
import Card from "../../../helper/Card";
import Template from "../../template/Template";
import s from "./Dashboard.module.scss";
import Event from "./Event";

function Dashboard() {
	const [booked, setBooked] = useState<any[]>([]);
	const [pending, setPending] = useState<any[]>([]);
	const [old, setOld] = useState<any[]>([]);

	useEffect(() => {
		loadDashboard();
	}, []);

	const loadDashboard = async () => {
		const res = await getDashboard();
		if (res.success) {
			const { booked, pending, old } = res;
			setBooked(booked);
			setPending(pending);
			setOld(old);
		} else {
			errorToast(res.message);
		}
	};
	return (
		<Template>
			{!!pending.length && (
				<Card title="pending events" className={s.pending_card}>
					<div className={s.events}>
						{pending.map((e) => (
							<Event buttonText="edit" event={e} />
						))}{" "}
					</div>
				</Card>
			)}
			{!!booked.length && (
				<Card title="booked events" className={s.pending_card}>
					<div className={s.events}>
						{booked.map((e) => (
							<Event event={e} buttonText="view" />
						))}{" "}
					</div>
				</Card>
			)}
			{!!old.length && (
				<Card title="old events" className={s.pending_card}>
					<div className={s.events}>
						{old.map((e) => (
							<Event event={e} buttonText="view" />
						))}
					</div>
				</Card>
			)}
		</Template>
	);
}

export default Dashboard;
