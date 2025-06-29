import { createBrowserRouter } from "react-router";
import Layout from "../components/layout/Layout";
import Dashboard from "../pages/dashboard";
import Settings from "../pages/settings";
import { loader as dashboardLoader } from "../pages/dashboard/loader";
import { Box } from "@mui/material";
import { loader as layoutLoader } from "../components/layout/loader.ts";

const Loading = () => {
  return <Box>loading ...</Box>;
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    loader: layoutLoader,
    HydrateFallback: Loading,
    children: [
      {
        index: true,
        element: <Dashboard />,
        loader: dashboardLoader,
        HydrateFallback: Loading,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },
]);
