import React, { useEffect, useState } from "react";
import { deleteService } from "../../../api/providers/deletedService";
import getServices, { TService } from "../../../api/providers/getServices";
import Card from "../../helper/Card";
import Template from "../Template";
import Service from "./Service";

function Providers() {
	const [services, setServices] = useState<TService[]>([]);

	useEffect(() => {
		getServices().then((res) => {
			if (res.success) {
				setServices(res.services);
			}
		});
	}, []);

	const deleteServiceById = async (serviceId: number) => {
		const res = await deleteService(serviceId);
		if (res.success) {
			setServices((pre) => pre.filter((x) => x.id !== serviceId));
		}
	};
	return (
		<Template>
			<Card
				title="Your Services"
				className="add-service-card services-view-card"
			>
				<div className="services-view-body">
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
