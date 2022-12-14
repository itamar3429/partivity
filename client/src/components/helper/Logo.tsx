import React from "react";
import hat from "../../assets/icons/hat.png";

type IProps = {
	fontSize: string | number;
	letterSpacing: string | number;
	SpanClass: string;
	iconClass: string;
	imgOnly?: boolean;
};
/**
 *
 * this component will provide the application logo.
 * with the requested size and spacing and additional optional settings.
 */
function Logo({
	letterSpacing,
	fontSize,
	SpanClass,
	iconClass: imgClass,
	imgOnly,
}: IProps) {
	if (imgOnly)
		return (
			<img
				src={hat}
				className={imgClass}
				style={{ height: fontSize }}
				alt="our app logo."
			/>
		);
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
