import { useEffect, useState } from "react";
import Lottie from "react-lottie-player";
import Loader from "../loader/Loader";
import WelcomeTemplate from "../welcomeTemplate/WelcomeTemplate";

export default function Welcome() {
	const [animationData, setAnimationData] =
		useState<Record<string | number, any>>();

	useEffect(() => {
		import("./dance-party.json").then(setAnimationData);
	}, []);
	return (
		<WelcomeTemplate>
			<div className="center-section">
				{!animationData ? (
					<Loader />
				) : (
					<>
						<div className="logos">
							<div className="center-logo-main">PARTIVITY</div>
							<div className="center-logo-subs">
								<div className="center-logo-sub1">Party.</div>
								<div className="center-logo-sub2">Simple.</div>
							</div>
						</div>
						<Lottie
							className="dance-party"
							animationData={animationData}
							play={true}
							loop={true}
						/>
					</>
				)}
			</div>
		</WelcomeTemplate>
	);
}
