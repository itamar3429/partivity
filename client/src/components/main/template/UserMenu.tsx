import React, { useState } from "react";
import { useDispatch, useSelector } from "../../../app/hooks";
import { api } from "../../../config";
import s from "./T.module.scss";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Link, useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { apiLogout } from "../../../api/auth";
import { infoToast } from "../../../libs/toast/info";
import { errorToast } from "../../../libs/toast/error";
import { removeUser } from "../../../app/slices/general.slice";

function UserMenu() {
	const user = useSelector((state) => state.general.user);

	const [showDetails, setShowDetails] = useState(false);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	let image = user.image;

	if (image) {
		image = `${api.images}/${image}`;
	} else {
		image =
			"https://ui-avatars.com/api/?background=00449e&color=fff&name=" +
			user.username;
	}

	return (
		<div
			className={s.user_menu}
			tabIndex={0}
			onBlur={(e) => {
				if (!e.currentTarget.contains(e.relatedTarget)) {
					setShowDetails(false);
				}
			}}
		>
			<div
				className={s.nav_user}
				tabIndex={1}
				onClick={() => {
					setShowDetails((pre) => !pre);
				}}
			>
				<img src={image} alt="user" className={s.user_image} />
				<span className={s.username}>
					{user.firstName || user.username} <KeyboardArrowDownIcon />
				</span>
			</div>

			<div className={`${s.user_details} ${showDetails ? s.show : ""}`}>
				<Link to={"/"} className={`${s.section} ${s.user_section} link`}>
					<img src={image} alt="user" className={s.image} />
					<span className={s.info}>
						<span className={s.name}>{user.username}</span>
						<div className={s.email}>{user.email}</div>
					</span>
				</Link>

				<div className={s.section}>
					<div
						className={s.menu_item}
						onClick={async () => {
							const res = await apiLogout();
							if (res.success) {
								infoToast("You are logged out");
								dispatch(removeUser());
							} else {
								errorToast(res.message);
							}
						}}
					>
						<LogoutIcon className={s.icon} />
						<span className={s.text}>Logout</span>
					</div>
				</div>
			</div>
		</div>
	);
}

export default UserMenu;
