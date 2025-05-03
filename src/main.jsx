import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { HashRouter, Route, Routes } from "react-router-dom";

import Training from "./components/Training.jsx";
import Customer from "./components/Customers.jsx";
import TrainingCalendar from "./components/Calendar.jsx"; 

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <HashRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/customers" element={<Customer />} />
        <Route path="/training" element={<Training />} />
        <Route path="/calendar" element={<TrainingCalendar />} />
      </Route>
    </Routes>
  </HashRouter>
);