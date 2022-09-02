import { ArrowBack } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import CustomLink from "../helper/Link";

function SignUp() {
	const navigate = useNavigate();
	const content = useRef<HTMLDivElement>(null);
	return (
		<div id="register-container">
			<CustomLink to="/welcome" className="back-icon">
				<IconButton>
					<ArrowBack></ArrowBack>
				</IconButton>
			</CustomLink>
			<div id="register-content" ref={content}>
				<form
					className="register-form right"
					onSubmit={(e) => {
						e.preventDefault();
					}}
				>
					<h1>Sign Up</h1>
					<input
						className="form-input"
						type="text"
						placeholder="Username"
					/>
					<input
						className="form-input"
						type={"email"}
						placeholder="Email"
					/>
					<input
						className="form-input"
						type="password"
						placeholder="Password"
					/>
					<input
						className="form-input"
						type="password"
						placeholder="Confirm password"
					/>
					<button className="submit-btn" type="submit">
						SIGN UP
					</button>
				</form>
				<div className="register-form overlay-panel left">
					<p style={{ fontSize: "40px" }}>PARTIVITY</p>
					<h1>Hello, Party!</h1>
					<p>Enter your info and start to party!</p>
					<p>already have an account?</p>
					<button
						className="submit-btn"
						data-cluster="login"
						onClick={(e) => {
							content.current?.classList.add("switch");
							setTimeout(() => {
								navigate("/login");
							}, 300);
						}}
					>
						Log In
					</button>
				</div>
			</div>
		</div>
	);
}

export default SignUp;
