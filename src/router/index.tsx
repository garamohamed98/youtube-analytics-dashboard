import { createBrowserRouter } from "react-router";
import Layout from "../components/layout/Layout";
import Dashboard from "../pages/dashboard";
import Settings from "../pages/settings";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },
]);
