import { styled } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import type { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme }) => ({
  backgroundColor: `${theme.palette.background.default} !important`,
  boxShadow: "none",
  border: "none",
  backgroundImage: "none",
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: theme.drawerWidth,
        width: `calc(100% - ${theme.drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        marginLeft: `calc(${theme.spacing(7)} + 1px)`,
        width: `calc(100% - (${theme.spacing(7)} + 1px))`,
        [theme.breakpoints.up("sm")]: {
          marginLeft: `calc(${theme.spacing(8)} + 1px)`,
          width: `calc(100% - (${theme.spacing(8)} + 1px))`,
        },
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
      },
    },
  ],
}));

export default AppBar;
