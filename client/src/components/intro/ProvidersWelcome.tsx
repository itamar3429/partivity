import React, { useEffect, useState } from "react";
import Lottie from "react-lottie-player";
import WelcomeTemplate from "./WelcomeTemplate";
import Loader from "../helper/Loader";
import Logo from "../helper/Logo";

function ProvidersWelcome() {
	const [animationData, setAnimationData] =
		useState<Record<string | number, any>>();

	useEffect(() => {
		fetch("/lottie/providers.json")
			.then((res) => res.json())
			.then(setAnimationData);
	}, []);

	if (!animationData) return <Loader />;
	return (
		<WelcomeTemplate>
			<div className="center-section providers">
				<div className="text">
					<p className="title">Hello Providers</p>
					<div className="text-content">
						<p>
							Before we dive into the details, you have reached the place
							where you can get closest
							<br />
							to your customers. And by extension, the virtual system of{" "}
							<span className="nav-logo">
								<Logo
									SpanClass="nav-logo-text custom-font"
									fontSize={15}
									iconClass="nav-logo-img custom-icon"
									letterSpacing={5}
								></Logo>
							</span>{" "}
							<br />
							Allows you to perform almost any action that you would
							probably perform on your phone,
							<br />
							only that instead of a call - here you will perform it in a
							few clicks. Sounds more comfortable,
							<br />
							doesn't it? But wait, everything discussed until now was
							part of a complete package deal that
							<br />
							you receive just because you are registered with us. Ready
							for it? You will be published in the
							<br />
							proposals of the party organizers, you will be able to
							receive well-arranged opinions from both
							<br />
							the system and the customers, and you are not obligated to
							anything. Most service providers at
							<br />
							this point of reading are already filling out the
							registration form, so what are you waiting for?
						</p>
					</div>
				</div>
				<Lottie
					className="providers-animation"
					animationData={animationData}
					play={true}
					loop={true}
				/>
			</div>
		</WelcomeTemplate>
	);
}

export default ProvidersWelcome;
