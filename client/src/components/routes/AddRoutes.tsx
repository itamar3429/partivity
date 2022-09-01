import React from "react";
import { Route } from "react-router-dom";

const AddRoutes = () => {
	return (
		<>
			<Route index element={<div>add route</div>}></Route>
			<Route path="service" element={<div>add service</div>}></Route>
			<Route path="image" element={<div>add image</div>}></Route>
		</>
	);
};

export default AddRoutes;
