import { Box } from "@mui/material";
import { useState } from "react";
import AppBar from "./AppBar/AppBar";
import Drawer from "./Drawer/Drawer";
import DrawerHeader from "../ui/Drawer/DrawerHeader/DrawerHeader";
import DrawerMenu from "../ui/Drawer/DrawwerMenu/DrawwerMenu";
import { Outlet } from "react-router";
import AppBarContent from "../ui/AppBar/AppBarContent/AppBarContent";

const Layout = () => {
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen((value) => !value);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed" open={open}>
        <AppBarContent handleToggle={handleToggle} />
      </AppBar>
      <Drawer variant={"permanent"} open={open}>
        <DrawerHeader onToggle={handleToggle} open={open} />
        <DrawerMenu open={open} setOpen={setOpen} />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
