import React from "react";
import "./css/App.scss";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./components/routes/AppRoutes";
import { useSelector } from "./app/hooks";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GetUserInfo from "./components/auth/GetUserInfo";

function App() {
	const className = useSelector((state) => state.transition.className);

	return (
		<Router>
			<ToastContainer
				position="top-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
			<div className={className}>
				<AppRoutes></AppRoutes>
			</div>
		</Router>
	);
}

export default App;
