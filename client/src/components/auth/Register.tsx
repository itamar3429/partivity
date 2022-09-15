import { ArrowBack } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiLogin, apiRegister } from "../../api/auth";
import { useDispatch } from "../../app/hooks";
import { setUser } from "../../app/slices/general.slice";
import { errorToast } from "../../libs/toast/error";
import CustomLink from "../helper/Link";

function Register() {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [verifyPass, setVerifyPass] = useState("");
	// const [alert, setAlert] = useState("");

	const navigate = useNavigate();
	const content = useRef<HTMLDivElement>(null);
	const dispatch = useDispatch();

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
					onSubmit={async (e) => {
						e.preventDefault();
						if (password === verifyPass) {
							const res = await apiRegister(username, email, password);
							if (res.success) {
								const login = await apiLogin(username, password);
								if (login.success) {
									dispatch(
										setUser({ ...login.user, connected: true })
									);
									navigate("/");
								} else {
									errorToast(login.message);
								}
							} else {
								errorToast(res.message);
							}
						}
					}}
				>
					<h1>Sign Up</h1>
					<input
						className="form-input"
						type="text"
						placeholder="Username"
						value={username}
						onChange={(e) => setUsername(e.currentTarget.value)}
						pattern="^[^ ]*$"
					/>
					<input
						className="form-input"
						type={"email"}
						placeholder="Email"
						value={email}
						onChange={(e) => setEmail(e.currentTarget.value)}
					/>
					<input
						className="form-input"
						type="password"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.currentTarget.value)}
						pattern="^[0-9a-zA-Z]{6,20}$"
						title={`password can contain digits letters and capital letters
and needs to be between and 20 digits long`}
					/>
					<input
						className="form-input"
						type="password"
						placeholder="Confirm password"
						value={verifyPass}
						onChange={(e) => setVerifyPass(e.currentTarget.value)}
						pattern={`^${password}$`}
						title={`passwords do not match`}
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

export default Register;
