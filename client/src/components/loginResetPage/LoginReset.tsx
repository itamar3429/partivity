import React from "react";
import Card from "../card/Card";

function LoginReset() {
	return (
		<div className="reset-container">
			<Card title="Reset Password">
				<div>
					<label htmlFor="email">
						Email
						<input
							type="email"
							name="email"
							id="email"
							placeholder="email"
						/>
					</label>
				</div>
			</Card>
		</div>
	);
}

export default LoginReset;
