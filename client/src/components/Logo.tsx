import React from "react";
import hat from "../assets/icons/hat.png";

type IProps = {
	fontSize: string | number;
	letterSpacing: string | number;
	SpanClass: string;
	iconClass: string;
};

function Logo({
	letterSpacing,
	fontSize,
	SpanClass,
	iconClass: imgClass,
}: IProps) {
	return (
		<span
			className={"custom-font " + SpanClass}
			style={{ fontSize: fontSize, letterSpacing, userSelect: "none" }}
		>
			P
			<img
				src={hat}
				className={imgClass}
				style={{ height: fontSize, marginRight: letterSpacing }}
				alt="our app logo."
			/>
			RTIVITY
		</span>
	);
}

export default Logo;
