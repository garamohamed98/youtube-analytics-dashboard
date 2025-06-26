import { styled, type CSSObject, type Theme } from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";

const openedMixin = (theme: Theme): CSSObject => ({
  width: `70%`,
  [theme.breakpoints.up("sm")]: {
    width: theme.drawerWidth,
  },
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  width: `0%`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  //General settings
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",

  //Mobile settings
  zIndex: theme.zIndex.drawer + 1,
  position: "fixed",

  //Desktop Settings
  [theme.breakpoints.up("sm")]: {
    position: "static",
  },
  "& .MuiDrawer-paper": {
    border: "none",
    backgroundColor: `${theme.palette.background.default} !important`,
    boxShadow: "none",
    backgroundImage: "none",
  },
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
      },
    },
  ],
}));

export default Drawer;
