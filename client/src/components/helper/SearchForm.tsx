import React, { useEffect } from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { Clear } from "@mui/icons-material/";
import s from "./Helpers.module.scss";
import HighlightText from "./HighlightText";

export type TOption = {
	label: string;
	id: string | number;
};

type IProps = {
	options: TOption[];
	text: string;
	setText: (text: string) => any;
	label?: string;
	width?: number | string;
	highlight?: boolean;
};

function SearchForm(props: IProps) {
	const [showOptions, setShowOptions] = React.useState(false);
	// const [inputText, setInputText] = React.useState(props.text);
	const input = React.useRef<HTMLInputElement>(null);

	const [inputText, setInputText] = [props.text, props.setText];

	useEffect(() => {
		input.current?.focus();
	}, []);

	return (
		<form
			autoComplete={"off"}
			className={s.search_form}
			onBlur={(e) => {
				if (!e.currentTarget?.contains(e.relatedTarget))
					setShowOptions(false);
			}}
			style={{
				width: props.width,
			}}
		>
			<TextField
				style={{ width: "100%" }}
				inputProps={{
					onInput: (e) => setInputText(e.currentTarget.value),
					onFocusCapture: () => setShowOptions(true),
					ref: input,
					autoFocus: true,
				}}
				InputProps={{
					endAdornment: inputText ? (
						<InputAdornment position="end">
							<IconButton onClick={() => setInputText("")}>
								<Clear></Clear>
							</IconButton>
						</InputAdornment>
					) : (
						<></>
					),
				}}
				label={props.label || "input"}
				value={inputText}
			/>
			{showOptions ? (
				<div className={s.options_container}>
					<div className={s.options}>
						{props.options
							.filter((option) =>
								option.label
									.toLowerCase()
									.includes(inputText.toLowerCase())
							)
							.map((option, i) => (
								<button
									type={"button"}
									key={i}
									className={s.option}
									onClick={() => {
										setInputText(option.label);
									}}
								>
									{props.highlight ? (
										<HighlightText
											highLightStyle={{ fontWeight: "bolder" }}
											text={option.label}
											textArr={inputText.split(" ")}
										></HighlightText>
									) : (
										option.label
									)}
								</button>
							))}
					</div>
				</div>
			) : (
				<></>
			)}
		</form>
	);
}

export default SearchForm;
