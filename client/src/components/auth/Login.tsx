import { ArrowBack } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiLogin } from "../../api/auth";
import { useDispatch } from "../../app/hooks";
import { setUser } from "../../app/slices/general.slice";
import CustomLink from "../helper/Link";

function Login() {
	const dispatch = useDispatch();

	const content = useRef<HTMLDivElement>(null);
	const navigate = useNavigate();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	return (
		<div id="login-container">
			<CustomLink to="/welcome" className="back-icon">
				<IconButton>
					<ArrowBack></ArrowBack>
				</IconButton>
			</CustomLink>
			<div id="login-content" ref={content}>
				<form
					className="login-form left"
					onSubmit={(e) => {
						e.preventDefault();
						apiLogin(username, password).then((res) => {
							if (res.success) {
								dispatch(setUser({ ...res.user, connected: true }));
								navigate("/");
							}
						});
					}}
				>
					<h1>Log in</h1>
					<input
						className="form-input"
						type="text"
						placeholder="Username"
						required
						value={username}
						onChange={(e) => setUsername(e.currentTarget.value)}
					/>
					<input
						className="form-input"
						type="password"
						placeholder="Password"
						required
						value={password}
						onChange={(e) => setPassword(e.currentTarget.value)}
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
