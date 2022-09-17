import React, { useEffect, useState } from "react";
// import getServices, { TService } from "../../../api/providers/getServices";
import Card from "../../helper/Card";
import Template from "../template/Template";
import Service from "./Service";
import s from "./P.module.scss";
import { errorToast } from "../../../libs/toast/error";
import { successToast } from "../../../libs/toast/success";
import getServices, {
	deleteService,
	TService,
} from "../../../api/providers/service";
import { getUpcomingEvents } from "../../../api/providers/schedule";
import UpcomingEvent from "./UpcomingEvent";

function Providers() {
	const [services, setServices] = useState<TService[]>([]);
	const [upcomingEvents, setUpcomingEvents] = useState<any[]>([]);

	useEffect(() => {
		loadUpcomingEvents();
		getServices().then((res) => {
			if (res.success) {
				setServices(res.services);
			} else {
				errorToast(res.message);
			}
		});
	}, []);

	const loadUpcomingEvents = async () => {
		const res = await getUpcomingEvents();
		if (res.success) {
			setUpcomingEvents(res.events);
		} else {
			errorToast("error loading upcoming events: " + res.message);
		}
	};

	const deleteServiceById = async (serviceId: number) => {
		const res = await deleteService(serviceId);
		if (res.success) {
			successToast("service deleted successfully");
			setServices((pre) => pre.filter((x) => x.id !== serviceId));
		} else {
			errorToast(res.message);
		}
	};
	return (
		<Template>
			<Card title="upcoming events" className={s["services-view-card"]}>
				<div className={s["services-view-body"]}>
					{!!upcomingEvents.length && (
						<div className={s.upcoming_container}>
							{upcomingEvents.map((event, i) => (
								<UpcomingEvent event={event} key={i} />
							))}
						</div>
					)}
					{!upcomingEvents.length && (
						<div
							style={{
								textAlign: "center",
								padding: 50,
								fontSize: 24,
							}}
						>
							no upcoming events
						</div>
					)}
				</div>
			</Card>
			<Card title="Your Services" className={s["services-view-card"]}>
				<div className={s["services-view-body"]}>
					{services.map((service) => {
						return (
							<Service
								key={service.id}
								service={service}
								type={service.service}
								onDelete={deleteServiceById}
							></Service>
						);
					})}
					{!services.length && (
						<div
							style={{
								textAlign: "center",
								padding: 50,
								fontSize: 24,
							}}
						>
							no services{" "}
						</div>
					)}
				</div>
			</Card>
		</Template>
	);
}

export default Providers;
