import React from "react";
import ReactDOMClient from "react-dom/client";
import { ReportFrameMonthly } from "./screens/ReportFrameMonthly";

const app = document.getElementById("app");
const root = ReactDOMClient.createRoot(app);
root.render(<ReportFrameMonthly />);
