import React, { useEffect, useState } from "react";
import Lottie from "react-lottie-player";
import { useNavigate, useParams } from "react-router-dom";
import { getInviteData } from "../../../../api/public/invitePage";
import WelcomeTemplate from "../../../intro/WelcomeTemplate";
import s from "./index.module.scss";

function Invite() {
	const [event, setEvent] = useState<any>({});
	const [envelope, setEnvelope] = useState<any>(null);
	const [fireworks, setFireworks] = useState<any>(null);
	const { eventId } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		loadEvent();
		fetch("/lottie/fireworks.json").then(async (res) => {
			setFireworks(await res.json());
		});
		fetch("/lottie/envelope.json").then(async (res) => {
			setEnvelope(await res.json());
		});
	}, []);

	const loadEvent = async () => {
		const res = await getInviteData(Number(eventId));

		if (res.success) {
			setEvent(res.event);
		} else {
			navigate("/404");
		}
	};
	return (
		<WelcomeTemplate>
			<div className={s.container}>
				<h1 className={s.title}>Welcome to The Party</h1>
				<h4 className={s.sub_title}>
					You have been invited to join {event.title}.
				</h4>
				<p>{event.description}</p>
				<div>
					We'll be expecting you on {new Date(event.date).toDateString()}
				</div>
				{!!envelope && (
					<Lottie
						className={s.envelope_animation}
						animationData={envelope}
						play={true}
						loop={false}
						segments={[0, 150]}
					/>
				)}
				{!!fireworks && (
					<Lottie
						className={s.fireworks_animation}
						animationData={fireworks}
						play
						loop
					/>
				)}
			</div>
		</WelcomeTemplate>
	);
}

export default Invite;
