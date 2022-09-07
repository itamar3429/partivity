import React, { useEffect, useState } from "react";
import getServices from "../../../api/providers/getServices";
import Card from "../../helper/Card";
import Template from "../Template";
import { services } from "./AddService";
import FoodService from "./FoodService";
import GeneralService from "./GeneralService";
import LocationService from "./LocationService";
import MusicService from "./MusicService";

export type TService = {
	id: number;
	service: typeof services[number];
	service_type: string;
	country: string | null;
	city: string | null;
	address: string | null;
	capacity: number | null;
	title: string;
	description: string;
	name?: string;
	user_id: number;
	images: string[] | [null];
};

function Providers() {
	const [services, setServices] = useState<TService[]>([]);

	useEffect(() => {
		getServices().then((res) => {
			if (res.success) {
				setServices(res.services);
			}
		});
	}, []);
	return (
		<Template>
			<Card
				title="Your Services"
				className="add-service-card services-view-card"
			>
				<div className="services-view-body">
					{services.map((service) => {
						if (service.service === "location")
							return (
								<LocationService service={service} key={service.id} />
							);
						if (service.service === "food")
							return <FoodService service={service} key={service.id} />;
						if (service.service === "general")
							return (
								<GeneralService service={service} key={service.id} />
							);
						if (service.service === "music")
							return <MusicService service={service} key={service.id} />;
						return <></>;
					})}
				</div>
			</Card>
		</Template>
	);
}

export default Providers;
