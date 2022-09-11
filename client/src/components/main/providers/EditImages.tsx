import { Button } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {
	addServiceImage,
	getImages,
} from "../../../api/providers/serviceImages";
import Card from "../../helper/Card";
import Template from "../Template";
import EditImageItem from "./EditImageItem";

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

	return (
		<Template>
			<Card
				title="edit images"
				className="mar-top mar-bottom"
				loader={loading}
			>
				<div className="edit-img-list card-border">
					{images.map((image, i) => (
						<EditImageItem
							key={i}
							handleError={handleError}
							image={image}
							handleDelete={handleDelete}
							setLoading={setLoading}
						/>
					))}
				</div>
				<div className="add-new-img">
					<div className="file-input">
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
						<div className="file-submit">
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
													{ objId: res.objId, id: res.imageId },
												]);
											}
										}
									} catch (err) {
										console.log("couldn't load file");
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
