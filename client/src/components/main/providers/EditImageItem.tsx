import { Delete } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React from "react";
import { deleteImages } from "../../../api/providers/serviceImages";
import { api } from "../../../config";
import s from "./P.module.scss";

type TProps = {
	image: {
		error?: string;
		id: number;
		objId: string;
	};
	handleError: (index: number) => void;
	handleDelete: (index: number) => void;
	setLoading: Function;
};

function EditImageItem(props: TProps) {
	return (
		<div className={s["edit-img-item"]} key={props.image.id}>
			<img
				className={s.img}
				src={
					props.image.error ||
					api.host + "/storage/get/" + props.image.objId
				}
				alt="about the service you are providing"
				onError={(e) => {
					props.handleError(props.image.id);
				}}
			/>
			<IconButton
				color="warning"
				className={s["delete-img-btn"]}
				onClick={(e) => {
					const id = props.image.id;
					props.setLoading(true);
					deleteImages(id).then(
						(res) => {
							if (res.success) {
								props.handleDelete(id);
							}
							props.setLoading(false);
						},
						() => props.setLoading(false)
					);
				}}
			>
				<Delete></Delete>
			</IconButton>
		</div>
	);
}

export default EditImageItem;
