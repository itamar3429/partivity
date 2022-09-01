import React, { useEffect, useState } from "react";
import Lottie from "react-lottie-player";
import WelcomeTemplate from "../welcomeTemplate/WelcomeTemplate";
import Loader from "../loader/Loader";
import Logo from "../Logo";

function About() {
	const [animationData, setAnimationData] =
		useState<Record<string | number, any>>();

	useEffect(() => {
		import("./aboutUs.json").then(setAnimationData);
	}, []);

	if (!animationData) return <Loader />;
	return (
		<WelcomeTemplate>
			<div className="center-section about">
				<div className="text">
					<p className="title">Who Are we?</p>
					<div className="text-content">
						<p>
							Let's face it, if you've come this far - it's a sign that
							you have a strong need to celebrate.
							<br />
							So where do we come into the picture? What if we told you
							that a team of developers
							<br /> programmed a tool that connects you, the party fans,
							to a social network that brings
							<br />
							together all the people with the need to party - just like
							you!
							<br />
							Sounds crazy and beyond imagination isn't it? So, please
							meet{" "}
							<span className="nav-logo">
								<Logo
									SpanClass="nav-logo-text custom-font"
									fontSize={15}
									iconClass="nav-logo-img custom-icon"
									letterSpacing={5}
								/>
							</span>
							.
							<br />
							Now all you have to do is follow the steps on the way to
							the next celebration...
							<br />
							without unnecessary headaches of planning. The party fire
							will never go out! Let's Rock!
						</p>
					</div>
				</div>
				<Lottie
					className="about-animation"
					animationData={animationData}
					play={true}
					loop={true}
				/>
			</div>
		</WelcomeTemplate>
	);
}

export default About;
