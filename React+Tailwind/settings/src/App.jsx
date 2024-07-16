import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SettingFrame } from "./screens/SettingFrame";

const router = createBrowserRouter([
  {
    path: "/*",
    element: <SettingFrame />,
  },
]);

export const App = () => {
  return <RouterProvider router={router} />;
};
