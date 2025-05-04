import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { HashRouter, Route, Routes, Outlet } from "react-router-dom";

import App from "./App.jsx";
import Training from "./components/Training.jsx";
import Customer from "./components/Customers.jsx";
import TrainingCalendar from "./components/Calendar.jsx";
import Statistics from "./components/Statistics.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <HashRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Customer />} />
        <Route path="customers" element={<Customer />} />
        <Route path="training" element={<Training />} />
        <Route path="calendar" element={<TrainingCalendar />} />
        <Route path="statistics" element={<Statistics />} />
      </Route>
    </Routes>
  </HashRouter>
);