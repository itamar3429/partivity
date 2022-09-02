import React, { useState } from "react";
import { useDispatch, useSelector } from "../../redux/hooks";
import Logo from "../helper/Logo";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import { toggle, toggleWide } from "../../redux/slices/nav.slice";
import { Link } from "react-router-dom";
import NavList from "../helper/NavList";
import NavItem from "../helper/NavItem";
import MultilineChartIcon from "@mui/icons-material/MultilineChart";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

type TProps = {};

function Template(props: React.PropsWithChildren<TProps>) {
	const className = useSelector((state) => state.transition.className);
	const showNav = useSelector((state) => state.nav.show);
	const showWide =
		useSelector((state) => state.nav.showWide) ||
		document.body.clientWidth < 1000;

	const dispatch = useDispatch();
	const toggleNav = () => dispatch(toggle());
	const toggleNavWide = () => dispatch(toggleWide());

	return (
		<div className={"template " + className + (!showWide ? " narrow" : "")}>
			<span
				style={{
					maxWidth: 0,
					maxHeight: 0,
					overflow: "hidden",
					display: "block",
				}}
			></span>
			<div className={"nav" + (showNav ? " show" : "")}>
				<Link to={"/"} className="link">
					<div className="nav-icon">
						<Logo
							SpanClass="nav-log-element"
							fontSize={20}
							iconClass=""
							letterSpacing={13}
							imgOnly={!showWide}
						/>
					</div>
				</Link>
				<div className="nav-list">
					<NavList>
						<NavItem
							title="dashboard"
							icon={<MultilineChartIcon />}
						></NavItem>
						<NavItem
							title="new party"
							icon={<AddCircleOutlineIcon />}
						></NavItem>
					</NavList>
				</div>
				<div className="nav-btn">
					<IconButton onClick={toggleNav}>
						{!showNav ? <MenuIcon></MenuIcon> : <CloseIcon></CloseIcon>}
					</IconButton>
				</div>
			</div>

			<div className="page-container">
				<div className="nav-header">
					<div className="header-left">
						<IconButton
							className="show-wide-narrow"
							onClick={toggleNavWide}
						>
							{!showWide ? (
								<KeyboardArrowRightIcon />
							) : (
								<KeyboardArrowLeftIcon />
							)}
						</IconButton>
						some feature go here
					</div>
					<div className="header-right">user menu</div>
				</div>
				<div className="page-content">{props.children}</div>
			</div>
		</div>
	);
}

export default Template;
