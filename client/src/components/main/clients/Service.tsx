import { Button } from "@mui/material";
import React from "react";
import { Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import { TService } from "../../../api/providers/service";
import { services } from "../../../api/providers/types";
import { api } from "../../../config";
import s from "./C.module.scss";

type TProps = {
	service: TService & Record<string, any>;
	type: typeof services[number];
	onDelete: (eventServiceId: number) => any;
	booked?: boolean;
};

function Service({ service, type, onDelete, booked }: TProps) {
	const title = type[0].toUpperCase() + type.substring(1);
	return (
		<div className={s.service}>
			<h3>{title} Service</h3>

			<div
				style={{
					display: "flex",
				}}
				className={s.client_view_container}
			>
				<div className={s.service_details}>
					<h5>details</h5>
					<div>
						<b>date: </b>
						<span>
							{service.start.split("T")[0] +
								" - " +
								service.start.split("T")[1].split(".")[0]}
						</span>
					</div>
					<div>
						<b>price: </b>
						<span>{service.price}</span>
					</div>
					<div>
						<b>name: </b>
						<span>{service.name}</span>
					</div>
					{["location", "general"].includes(type) && (
						<div>
							<b>capacity: </b>
							<span>{service.capacity || "not set"}</span>
						</div>
					)}
					<div>
						<b>service type: </b>
						<span>{service.service_type}</span>
					</div>
					<div>
						<b>title: </b>
						<span>{service.title}</span>
					</div>
					<div>
						<b>description: </b>
						<span>{service.description}</span>
					</div>

					{["location"].includes(type) && (
						<>
							<h5 style={{ marginTop: 10 }}>address</h5>
							<div>
								<b>country: </b>
								<span>{service.country}</span>
							</div>
							<div>
								<b>city: </b>
								<span>{service.city}</span>
							</div>
							<div>
								<b>address: </b>
								<span>{service.address}</span>
							</div>
						</>
					)}
				</div>
				{service.images && service.images[0] ? (
					<Carousel className={s.client_view_images}>
						{service.images.map((img, i) => (
							<Carousel.Item interval={5000} key={i}>
								<img
									src={api.host + "/storage/get/" + img}
									alt=""
									style={{ width: "100%" }}
									onError={(e) =>
										(e.currentTarget.src = "/img/image-not-found.png")
									}
								/>
							</Carousel.Item>
						))}
					</Carousel>
				) : (
					<div
						className={s.client_view_images}
						style={{ textAlign: "center" }}
					>
						no images
					</div>
				)}
			</div>
			<div className={s["buttons"]}>
				{/* <Link to={`/providers/schedule/${service.id}`} className="link">
					<Button color="secondary" variant="contained">
						Schedule
					</Button>
				</Link> */}
				{["food"].includes(type) && (
					<Link to={`/menu/${service.service_id}`} className="link">
						<Button color="warning" variant="contained">
							Menu
						</Button>
					</Link>
				)}
				<Button
					color="error"
					variant="contained"
					onClick={() => {
						// onDelete(service.id);
						if (!booked) onDelete(service.event_service_id);
					}}
					disabled={booked}
				>
					Delete
				</Button>
			</div>
		</div>
	);
}

export default Service;
