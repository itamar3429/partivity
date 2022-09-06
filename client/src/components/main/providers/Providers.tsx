import React, { useEffect, useState } from "react";
import getServices from "../../../api/providers/getServices";
import Card from "../../helper/Card";
import Template from "../Template";

function Providers() {
	const [services, setServices] = useState<any[]>([]);

	useEffect(() => {
		getServices().then((res) => {
			if (res.success) {
				setServices(res.services);
			}
		});
	}, []);
	return (
		<Template>
			<Card title="Your Services" className="add-service-card">
				services list
			</Card>
		</Template>
	);
}

export default Providers;
