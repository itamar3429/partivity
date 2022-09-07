import { Button } from "@mui/material";
import React from "react";
import { Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import { api } from "../../../config";
import { TService } from "./Providers";

type TProps = {
	service: TService;
};

function LocationService({ service }: TProps) {
	return (
		<div className="service">
			<h3>Location Service</h3>

			<div
				style={{
					display: "flex",
				}}
				className="provider-view-container"
			>
				<div className="service-details">
					<h5>details</h5>
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
					<div>
						<b>capacity: </b>
						<span>{service.capacity}</span>
					</div>
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
				</div>
				{service.images[0] ? (
					<Carousel className="provider-view-images">
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
						className="provider-view-images"
						style={{ textAlign: "center" }}
					>
						no images
					</div>
				)}
			</div>
			<div className="buttons">
				<Link to={`/providers/edit/service/${service.id}`} className="link">
					<Button color="success" variant="contained">
						Edit details
					</Button>
				</Link>
				<Link to={`/providers/edit/images/${service.id}`} className="link">
					<Button color="info" variant="contained">
						Edit images
					</Button>
				</Link>
			</div>
		</div>
	);
}

export default LocationService;
