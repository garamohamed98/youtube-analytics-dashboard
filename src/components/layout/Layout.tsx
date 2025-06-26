import {
  Box,
  IconButton,
  Toolbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import AppBar from "./AppBar/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "./Drawer/Drawer";
import DrawerHeader from "../ui/Drawer/DrawerHeader/DrawerHeader";
import DrawerMenu from "../ui/Drawer/DrawwerMenu/DrawwerMenu";
import { Outlet } from "react-router";

const Layout = () => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleToggle = () => {
    setOpen((value) => !value);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed" open={open}>
        <Toolbar>
          {isMobile && (
            <IconButton
              onClick={() => {
                handleToggle();
              }}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
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
