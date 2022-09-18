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
			<Card title="pending events" className={s.pending_card}>
				{!!pending.length && (
					<div className={s.events}>
						{pending.map((e, i) => (
							<Event buttonText="edit" event={e} key={i} />
						))}{" "}
					</div>
				)}
				{!pending.length && (
					<div
						style={{
							textAlign: "center",
							padding: 50,
							fontSize: 24,
						}}
					>
						no pending events
					</div>
				)}
			</Card>

			<Card title="booked events" className={s.pending_card}>
				{!!booked.length && (
					<div className={s.events}>
						{booked.map((e, i) => (
							<Event event={e} buttonText="view" key={i} />
						))}{" "}
					</div>
				)}
				{!booked.length && (
					<div
						style={{
							textAlign: "center",
							padding: 50,
							fontSize: 24,
						}}
					>
						no booked events
					</div>
				)}
			</Card>

			<Card title="old events" className={s.pending_card}>
				{!!old.length && (
					<div className={s.events}>
						{old.map((e, i) => (
							<Event event={e} buttonText="view" key={i} />
						))}
					</div>
				)}
				{!old.length && (
					<div
						style={{
							textAlign: "center",
							padding: 50,
							fontSize: 24,
						}}
					>
						no old events
					</div>
				)}
			</Card>
		</Template>
	);
}

export default Dashboard;
