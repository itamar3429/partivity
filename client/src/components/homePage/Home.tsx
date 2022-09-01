import { useEffect, useState } from "react";
import Lottie from "react-lottie-player";
import { Link } from "react-router-dom";

export default function Home() {
	const [animationData, setAnimationData] =
		useState<Record<string | number, any>>();

	useEffect(() => {
		import("./conffetti.json").then(setAnimationData);
	}, []);

	if (!animationData)
		return (
			<div className="main">
				<div className="center-section">
					<div className="center-logo-main">
						<ul className="loader">
							<li className="loader-item"></li>
							<li className="loader-item"></li>
							<li className="loader-item"></li>
						</ul>
					</div>
				</div>
			</div>
		);
	return (
		<div className="main">
			<div className="upper-section">
				<nav>
					<ul>
						<li>
							<Link
								style={{ color: "inherit", textDecoration: "inherit" }}
								to="/about"
							>
								What We Do
							</Link>
						</li>
						<li>
							<Link
								style={{ color: "inherit", textDecoration: "inherit" }}
								to="/providers"
							>
								Providers
							</Link>
						</li>
						<li>
							<Link
								style={{ color: "inherit", textDecoration: "inherit" }}
								to="/my-parties"
							>
								Lets Party!
							</Link>
						</li>
						<li>
							<Link
								style={{ color: "inherit", textDecoration: "inherit" }}
								to="/login"
							>
								Login
							</Link>
						</li>
					</ul>
				</nav>
			</div>
			<div className="center-section">
				<div className="center-logo-main">PARTIVITY</div>
				<div className="center-logo-subs">
					<div className="center-logo-sub1">Party.</div>
					<div className="center-logo-sub2">Simple.</div>
				</div>
				<Lottie
					className="conffetti"
					animationData={animationData}
					play
					loop={false}
				/>
			</div>
		</div>
	);
}
