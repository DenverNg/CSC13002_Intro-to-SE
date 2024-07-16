import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { DashboardFrame } from "./screens/DashboardFrame";

const router = createBrowserRouter([
  {
    path: "/*",
    element: <DashboardFrame />,
  },
]);

export const App = () => {
  return <RouterProvider router={router} />;
};
