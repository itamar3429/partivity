import { Button } from "@mui/material";
import React from "react";
import { Modal } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { bookEvent } from "../../../api/client/events";
import Card from "../../helper/Card";

type TProps = {
	onHide: () => void;
	show: boolean;
	services: any[];
};

function EventSubmitModal(props: TProps) {
	const { eventId } = useParams();
	return (
		<Modal show={props.show} onHide={props.onHide}>
			<Card title="book event">
				<div>
					<p>
						After booking an event you cannot cancel. Make sure you want
						to proceed.
					</p>
					<div>
						<b>services: </b>
						{props.services.map((x) => x.name).join(" | ")}
					</div>
					<div>
						<b>total price: </b>
						{props.services
							.map((x) => x.price)
							.reduce((pre, curr) => pre + (curr || 0), 0)}
					</div>
					<div
						style={{
							padding: "20px 10px",
							display: "flex",
							justifyContent: "flex-end",
						}}
					>
						<Button
							color="warning"
							variant="contained"
							onClick={async () => {
								const res = await bookEvent(Number(eventId));
								if (res.success) {
									console.log("service booked");
								} else {
									console.log(res);
								}
							}}
						>
							book
						</Button>
					</div>
				</div>
			</Card>
		</Modal>
	);
}

export default EventSubmitModal;
