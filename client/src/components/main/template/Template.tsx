import React, { useState } from "react";
import { useDispatch, useSelector } from "../../../app/hooks";
import Logo from "../../helper/Logo";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import { toggle, toggleWide } from "../../../app/slices/nav.slice";
import { Link } from "react-router-dom";
import NavList from "./NavList";
import NavItem from "./NavItem";
import MultilineChartIcon from "@mui/icons-material/MultilineChart";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import PostAddIcon from "@mui/icons-material/PostAdd";
import ForProviders from "../../auth/authExclude/ForProviders";
import ForClient from "../../auth/authExclude/ForClient";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Filler from "../../helper/Filler";
import s from "./T.module.scss";

type TProps = {};

function Template(props: React.PropsWithChildren<TProps>) {
	const className = useSelector((state) => state.transition.className);
	const showNav = useSelector((state) => state.nav.show);
	const [wideMode, setWideMode] = useState(document.body.clientWidth >= 1000);
	const showWide = useSelector((state) => state.nav.showWide) || !wideMode;

	const dispatch = useDispatch();
	const toggleNav = () => dispatch(toggle());
	const toggleNavWide = () => dispatch(toggleWide());

	window.onresize = () => {
		const newWideMode = document.body.clientWidth >= 1000;
		if (newWideMode !== wideMode) {
			setWideMode(newWideMode);
		}
	};

	return (
		<div
			className={`${s.template} ${className} ${!showWide ? s.narrow : ""}`}
		>
			<span
				style={{
					maxWidth: 0,
					maxHeight: 0,
					overflow: "hidden",
					display: "block",
				}}
			></span>
			<div className={`${s.nav_bar} ${showNav ? s.show : ""}`}>
				<Link to={"/"} className={"link"}>
					<div className={s.nav_icon}>
						<Logo
							SpanClass={s.nav_log_element}
							fontSize={20}
							iconClass=""
							letterSpacing={13}
							imgOnly={!showWide}
						/>
					</div>
				</Link>
				<div className={s.nav_list}>
					<NavList>
						<NavItem
							title="dashboard"
							icon={<MultilineChartIcon />}
							page="dashboard"
							to="/"
						></NavItem>
						<NavItem
							title="new event"
							icon={<AddCircleOutlineIcon />}
							page="event/new"
							to="/event/new"
						></NavItem>
						<ForProviders>
							<NavItem
								title="providers"
								icon={<AddBusinessIcon />}
								page="providers"
								to="/providers"
							></NavItem>
							<NavItem
								title="add service"
								icon={<PostAddIcon />}
								page="providers/add"
								to="/providers/add"
							></NavItem>
						</ForProviders>
						<ForClient strict>
							<NavItem
								title="become provider"
								icon={<PersonAddIcon />}
								page="provider/join"
								to="/provider/join"
							></NavItem>
						</ForClient>
					</NavList>
				</div>
				<div className={s.nav_btn}>
					<IconButton onClick={toggleNav} aria-label="toggle nav">
						{!showNav ? <MenuIcon></MenuIcon> : <CloseIcon></CloseIcon>}
					</IconButton>
				</div>
			</div>

			<div className={s.page_container}>
				<div className={s.nav_header}>
					<div className={s.header_left}>
						<IconButton
							className={s.show_wide_narrow}
							onClick={toggleNavWide}
							aria-label="toggle wide nav"
						>
							{!showWide ? (
								<KeyboardArrowRightIcon />
							) : (
								<KeyboardArrowLeftIcon />
							)}
						</IconButton>
						some feature go here
					</div>
					<div className={s.header_right}>user menu</div>
				</div>
				<div className={s.page_content}>
					<Filler></Filler>
					{props.children}
					<Filler></Filler>
				</div>
			</div>
		</div>
	);
}

export default Template;
