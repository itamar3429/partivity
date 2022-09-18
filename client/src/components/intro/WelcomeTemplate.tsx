import React, { useEffect, useState } from "react";
import CustomLink from "../helper/Link";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import Lottie from "react-lottie-player";
import Logo from "../helper/Logo";
import Loader from "../helper/Loader";
import ForClient from "../auth/authExclude/ForClient";
import ForUnauthorized from "../auth/authExclude/ForUnauthorized";

function WelcomeTemplate({ children }: React.PropsWithChildren<{}>) {
	const [show, setShow] = useState(false);
	const [animationData, setAnimationData] =
		useState<Record<string | number, any>>();

	useEffect(() => {
		fetch("/lottie/ballons-mobile.json")
			.then((res) => res.json())
			.then(setAnimationData);
	}, []);

	const closeNav = () => setShow(false);

	if (!animationData) return <Loader />;
	return (
		<div className="main">
			<div className="nav-section">
				<ForClient>
					<CustomLink
						to="/"
						style={{ color: "inherit", textDecoration: "inherit" }}
					>
						<div className="nav-logo">
							<Logo
								SpanClass="nav-logo-text"
								fontSize={"18pt"}
								iconClass="nav-logo-img"
								letterSpacing={"23px"}
							></Logo>
						</div>
					</CustomLink>
				</ForClient>
				<ForUnauthorized>
					<CustomLink
						to="/welcome"
						style={{ color: "inherit", textDecoration: "inherit" }}
					>
						<div className="nav-logo">
							<Logo
								SpanClass="nav-logo-text"
								fontSize={"18pt"}
								iconClass="nav-logo-img"
								letterSpacing={"23px"}
							></Logo>
						</div>
					</CustomLink>
				</ForUnauthorized>
				<div className={"nav-bar" + (show ? " show" : " hide")}>
					<div className="balloon-outer">
						<Lottie
							className="balloons-mobile"
							animationData={animationData}
							play={true}
							loop={true}
							rendererSettings={{
								preserveAspectRatio: "xMidYMid slice",
							}}
						/>
					</div>
					<nav>
						<ul>
							<li>
								<CustomLink
									onClick={closeNav}
									style={{
										color: "inherit",
										textDecoration: "inherit",
									}}
									to="/about"
								>
									What We Do
								</CustomLink>
							</li>
							<li>
								<CustomLink
									onClick={closeNav}
									style={{
										color: "inherit",
										textDecoration: "inherit",
									}}
									to="/welcome/providers"
								>
									Providers
								</CustomLink>
							</li>
							{/* <li>
								<CustomLink
									onClick={closeNav}
									style={{
										color: "inherit",
										textDecoration: "inherit",
									}}
									to="/my-parties"
								>
									Lets Party
								</CustomLink>
							</li> */}
							<li>
								<CustomLink
									onClick={closeNav}
									style={{
										color: "inherit",
										textDecoration: "inherit",
									}}
									to="/login"
								>
									Login
								</CustomLink>
							</li>
						</ul>
					</nav>
				</div>
				<div className="nav-icon">
					<IconButton
						onClick={() => setShow((pre) => !pre)}
						style={
							show ? { position: "fixed", right: "5%", top: "35px" } : {}
						}
					>
						{!show ? (
							<MenuIcon></MenuIcon>
						) : (
							<CloseIcon style={{ color: "white" }}></CloseIcon>
						)}
					</IconButton>
				</div>
			</div>
			{children}
		</div>
	);
}

export default WelcomeTemplate;
