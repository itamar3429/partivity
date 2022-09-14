import { Delete } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import React from "react";
import {
	deleteImages,
	updatePrimaryImage,
} from "../../../api/providers/serviceImages";
import LooksOneIcon from "@mui/icons-material/LooksOne";
import LooksTwoIcon from "@mui/icons-material/LooksTwo";
import { api } from "../../../config";
import s from "./P.module.scss";
import { useParams } from "react-router-dom";

type TProps = {
	image: {
		error?: string;
		id: number;
		obj_id: string;
		primary: boolean;
	};
	handleError: (index: number) => void;
	handleDelete: (index: number) => void;
	handlePrimary: (id: number) => void;
	setLoading: Function;
};

function EditImageItem(props: TProps) {
	const serviceId = useParams().service_id as string;
	return (
		<div className={s["edit-img-item"]} key={props.image.id}>
			<img
				className={s.img}
				src={
					props.image.error ||
					api.host + "/storage/get/" + props.image.obj_id
				}
				alt="about the service you are providing"
				onError={(e) => {
					props.handleError(props.image.id);
				}}
			/>
			<div className={s.img_btns}>
				{props.image.primary ? (
					<Tooltip title="primary">
						<IconButton color="info" onClick={(e) => {}}>
							<LooksOneIcon></LooksOneIcon>
						</IconButton>
					</Tooltip>
				) : (
					<Tooltip title="make primary">
						<IconButton
							color="success"
							onClick={(e) => {
								const id = props.image.id;
								props.setLoading(true);
								updatePrimaryImage(id, Number(serviceId)).then(
									(res) => {
										if (res.success) {
											props.handlePrimary(id);
										}
										props.setLoading(false);
									},
									() => props.setLoading(false)
								);
							}}
						>
							<LooksTwoIcon></LooksTwoIcon>
						</IconButton>
					</Tooltip>
				)}
				<Tooltip title="delete image">
					<IconButton
						color="warning"
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
				</Tooltip>
			</div>
		</div>
	);
}

export default EditImageItem;
