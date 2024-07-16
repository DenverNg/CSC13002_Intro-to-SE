import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ReportFrameDaily } from "./screens/ReportFrameDaily";

const router = createBrowserRouter([
  {
    path: "/*",
    element: <ReportFrameDaily />,
  },
]);

export const App = () => {
  return <RouterProvider router={router} />;
};
