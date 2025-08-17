import { Box } from "@mui/material";
import { useState } from "react";
import AppBar from "./AppBar/AppBar";
import Drawer from "./Drawer/Drawer";
import DrawerHeader from "../ui/Drawer/DrawerHeader/DrawerHeader";
import DrawerMenu from "../ui/Drawer/DrawwerMenu/DrawwerMenu";
import { Outlet } from "react-router";
import AppBarContent from "../ui/AppBar/AppBarContent/AppBarContent";
import DrawerFooter from "../ui/Drawer/DrawerFooter/DrawerFooter";

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
        <Box flexGrow={1}>
          <DrawerHeader onToggle={handleToggle} open={open} />
          <DrawerMenu open={open} setOpen={setOpen} />
        </Box>
        <Box py="30px">
          <DrawerFooter />
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
