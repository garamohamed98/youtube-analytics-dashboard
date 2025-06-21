import "./App.css";
import {
  Box,
  Button,
  CardContent,
  CssBaseline,
  IconButton,
  TextField,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import AppBar from "./components/layout/AppBar/AppBar";
import Drawer from "./components/layout/Drawer/Drawer";
import DrawerMenu from "./components/ui/Drawer/DrawwerMenu/DrawwerMenu";
import DrawerHeader from "./components/ui/Drawer/DrawerHeader/DrawerHeader";
import DashboardCard from "./components/common/DashboardCard/DashboardCard";
import MenuIcon from "@mui/icons-material/Menu";

function App() {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleToggle = () => {
    setOpen((value) => !value);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
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
        <DrawerMenu open={open} />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        <Button variant="outlined">aze</Button>
        <DashboardCard>
          <CardContent>
            <Typography sx={{ color: "text.primary" }}>primaryText</Typography>
            <Typography sx={{ color: "text.secondary" }}>secondary</Typography>
          </CardContent>
        </DashboardCard>
        <DashboardCard filled={false}>
          <CardContent>
            <Typography sx={{ color: "text.primary" }}>primaryText</Typography>
            <Typography sx={{ color: "text.secondary" }}>secondary</Typography>
          </CardContent>
        </DashboardCard>
        <TextField />
      </Box>
    </Box>
  );
}

export default App;
