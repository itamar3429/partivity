import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
	const content = useRef<HTMLDivElement>(null);
	const navigate = useNavigate();
	return (
		<div id="login-container">
			<div id="login-content" ref={content}>
				<form
					className="login-form left"
					onSubmit={(e) => {
						e.preventDefault();
					}}
				>
					<h1>log in</h1>
					<input
						className="form-input"
						type="text"
						placeholder="Username"
					/>
					<input
						className="form-input"
						type="password"
						placeholder="Password"
					/>
					<Link to={"/login/reset"} className="link">
						forgot your password?
					</Link>
					<button className="submit-btn" type="submit">
						LOG IN
					</button>
				</form>
				<div className="login-form overlay-panel right">
					<p style={{ fontSize: "40px" }}>PARTIVITY</p>
					<h1>Hello, Party!</h1>
					<p>Enter your info and start to party!</p>
					<p>if you don't have an account</p>
					<button
						className="submit-btn"
						onClick={(e) => {
							content.current?.classList.add("switch");
							setTimeout(() => {
								navigate("/register");
							}, 300);
						}}
					>
						Sign Up
					</button>
				</div>
			</div>
		</div>
	);
}

export default Login;
