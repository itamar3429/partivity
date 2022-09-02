import React from "react";
import Card from "../helper/Card";

function LoginReset() {
	return (
		<div className="reset-container">
			<Card title="Reset Password">
				<form
					style={{
						padding: 20,
						display: "flex",
						flexDirection: "column",
						gap: 30,
					}}
					onSubmit={(e) => {
						e.preventDefault();
					}}
				>
					<input
						type="email"
						name="email"
						id="email"
						placeholder="Email"
						className="input stretch"
					/>
					<div>
						<input
							type="submit"
							value="Reset"
							className="button red stretch outline"
						/>
					</div>
				</form>
			</Card>
		</div>
	);
}

export default LoginReset;
