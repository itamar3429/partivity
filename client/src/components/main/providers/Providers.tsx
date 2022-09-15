import React, { useEffect, useState } from "react";
import { deleteService } from "../../../api/providers/deletedService";
import getServices, { TService } from "../../../api/providers/getServices";
import Card from "../../helper/Card";
import Template from "../template/Template";
import Service from "./Service";
import s from "./P.module.scss";
import { errorToast } from "../../../libs/toast/error";
import { successToast } from "../../../libs/toast/success";

function Providers() {
	const [services, setServices] = useState<TService[]>([]);

	useEffect(() => {
		getServices().then((res) => {
			if (res.success) {
				setServices(res.services);
			} else {
				errorToast(res.message);
			}
		});
	}, []);

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
				</div>
			</Card>
		</Template>
	);
}

export default Providers;
