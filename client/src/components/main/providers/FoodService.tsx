import { Button } from "@mui/material";
import React from "react";
import { Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import { api } from "../../../config";
import { TService } from "./Providers";

type TProps = {
	service: TService;
};

function FoodService({ service }: TProps) {
	return (
		<div className="service">
			<h3>Food Service</h3>

			<div
				style={{
					display: "flex",
				}}
				className="provider-view-container"
			>
				<div className="service-details">
					<h5>details</h5>
					<div>
						<b>name: </b>
						<span>{service.name}</span>
					</div>
					<div>
						<b>capacity: </b>
						<span>{service.capacity || "not set"}</span>
					</div>
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
						Edit Details
					</Button>
				</Link>
				<Link to={`/providers/edit/images/${service.id}`} className="link">
					<Button color="info" variant="contained">
						Edit Images
					</Button>
				</Link>
				<Link to={`/providers/edit/menu/${service.id}`} className="link">
					<Button color="primary" variant="contained">
						Edit Menu
					</Button>
				</Link>
			</div>
		</div>
	);
}

export default FoodService;
