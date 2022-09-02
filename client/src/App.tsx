import React from "react";
import "./css/App.scss";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./components/routes/AppRoutes";
import { useSelector } from "./redux/hooks";

function App() {
	const className = useSelector((state) => state.transition.className);
	return (
		<Router>
			<div className={className}>
				<AppRoutes></AppRoutes>
			</div>
		</Router>
	);
}

export default App;
