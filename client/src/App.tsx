import React from "react";
import { Counter } from "./features/counter/Counter";
import "./App.scss";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./components/routes/AppRoutes";
import Welcome from "./components/welcome/Welcome";
import Template from "./components/template/Template";

function App() {
  return (
    <Router>
      <Template>
        <AppRoutes></AppRoutes>
      </Template>
    </Router>
  );
}

export default App;
