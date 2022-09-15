import React from "react";
import Card from "../../../helper/Card";
import Template from "../../template/Template";
import s from "./Dashboard.module.scss";

function Dashboard() {
	return (
		<Template>
			<Card title="pending events" className={s.pending_card}>
				pending events
			</Card>
		</Template>
	);
}

export default Dashboard;
