import React, { useEffect, useRef, useState } from "react";
import Button from "@mui/material/Button";
import { useParams } from "react-router-dom";
import {
	addServiceImage,
	getImages,
} from "../../../../api/providers/serviceImages";
import Card from "../../../helper/Card";
import Template from "../../template/Template";
import EditImageItem from "./EditImageItem";
import s from "./images.module.scss";
import { errorToast } from "../../../../libs/toast/error";

function parseFileName(str: string, len: number) {
	const dotIndex = str.lastIndexOf(".");
	const name = dotIndex >= 0 ? str.substring(0, dotIndex) : str;
	const ext = dotIndex >= 0 ? str.substring(dotIndex) : "";

	if (name.length > len) {
		const half = Math.ceil(len / 2);
		const nameLength = name.length;
		return (
			name.substring(0, len - half) +
			"..." +
			name.substring(nameLength - half, nameLength) +
			ext
		);
	}
	return str;
}

function EditImages() {
	const [images, setImages] = useState<any[]>([]);
	const [fileName, setFileName] = useState("");
	const [loading, setLoading] = useState(false);

	const params = useParams();
	const file = useRef<HTMLInputElement>(null);

	const serviceId = params.service_id as string;

	useEffect(() => {
		getImages(serviceId).then((res) => {
			if (res.success) {
				setImages(res.images);
			} else {
				errorToast(res.message);
			}
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleDelete = (id: number) => {
		setImages((pre) => pre.filter((x) => x.id !== id));
	};

	const handleError = (id: number) => {
		setImages((pre) =>
			pre.map((x) => {
				if (x.id === id) x.error = "/img/image-not-found.png";
				return x;
			})
		);
	};

	const handlePrimary = (id: number) => {
		setImages((pre) =>
			pre
				.map((x) => {
					x.primary = x.id === id;
					return x;
				})
				.sort(
					(a, b) =>
						(b.primary ? 1 : 0) - (a.primary ? 1 : 0) || a.id - b.id
				)
		);
	};

	return (
		<Template>
			<Card title="edit images" className={s.images_card} loader={loading}>
				<div className={`${s["edit-img-list"]} card-border`}>
					{images.map((image, i) => (
						<EditImageItem
							key={i}
							handleError={handleError}
							image={image}
							handleDelete={handleDelete}
							setLoading={setLoading}
							handlePrimary={handlePrimary}
						/>
					))}
					{!images.length && (
						<h4
							className="title"
							style={{ textAlign: "center", width: "100%" }}
						>
							no images
						</h4>
					)}
				</div>
				<div className={s["add-new-img"]}>
					<div className={s["file-input"]}>
						<span>{parseFileName(fileName, 20)}</span>
						<Button variant="contained" component="label">
							Upload
							<input
								hidden
								accept="image/*"
								type="file"
								ref={file}
								onChange={(e) => {
									const files = file.current?.files;
									setFileName(files ? files[0].name : "");
								}}
							/>
						</Button>
					</div>
					{fileName && (
						<div className={s["file-submit"]}>
							<Button
								variant="contained"
								component="label"
								onClick={async (e) => {
									setLoading(true);
									try {
										const files = file.current!.files;

										if (files) {
											const res = await addServiceImage(
												files[0],
												serviceId
											);

											if (res.success) {
												setImages((pre) => [
													...pre,
													{ obj_id: res.objId, id: res.imageId },
												]);
											} else {
												errorToast(res.message);
											}
										}
									} catch (err) {
										errorToast("Failed tp load file");
									}
									setLoading(false);
								}}
							>
								add
							</Button>
						</div>
					)}
				</div>
			</Card>
		</Template>
	);
}

export default EditImages;
