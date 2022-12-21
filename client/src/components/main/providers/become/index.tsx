import {
	Button,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	Grid,
	TextField,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { becomeProvider } from "../../../../api/providers/becomeProvider";
import { useSelector } from "../../../../app/hooks";
import { errorToast } from "../../../../libs/toast/error";
import GetUserInfo from "../../../auth/GetUserInfo";
import Template from "../../template/Template";

function BecomeProvider() {
	const maxSm = useTheme().breakpoints.down("sm");
	const isMaxWidth = useMediaQuery(maxSm);
	const user = useSelector((s) => s.general.user);

	const [firstName, setFirstName] = useState(user.firstName || "");
	const [lastName, setLastName] = useState(user.lastName || "");
	const nav = useNavigate();

	return (
		<Template>
			<Card
				sx={{
					maxWidth: isMaxWidth ? "100%" : "1000px",
					minWidth: isMaxWidth ? 0 : 500,
					width: isMaxWidth ? "100%" : "calc(100% - 40px)",
					margin: isMaxWidth ? "30px 0" : "30px 20px",
					marginTop: "30px",
				}}
			>
				<CardHeader
					component={"span"}
					title={"Become a Provider"}
				></CardHeader>
				<form
					onSubmit={async (e) => {
						e.preventDefault();
						const res = await becomeProvider(firstName, lastName);
						if (res.success) {
							GetUserInfo(true);
							nav("/");
						} else {
							errorToast(res.message);
						}
					}}
				>
					<CardContent>
						<p>
							hello, welcome to our providers program. We are happy to
							see you join. just fill out some information and start
							publishing your services
						</p>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={6}>
								<TextField
									fullWidth
									label="first name"
									value={firstName}
									onChange={(e) => setFirstName(e.target.value)}
									required
								></TextField>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									fullWidth
									label="last name"
									required
									value={lastName}
									onChange={(e) => setLastName(e.target.value)}
								></TextField>
							</Grid>
						</Grid>
					</CardContent>
					<CardActions
						style={{
							justifyContent: "flex-end",
						}}
					>
						<Button type="submit">Start providing</Button>
					</CardActions>
				</form>
			</Card>
		</Template>
	);
}

export default BecomeProvider;
