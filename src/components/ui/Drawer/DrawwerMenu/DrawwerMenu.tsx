import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
  type SvgIconProps,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { NavLink } from "react-router";
import { token } from "../../../../theme/themeSettings";

const MenuItem = ({
  icon,
  title,
  open,
  setOpen,
  to,
}: {
  icon: React.ReactElement<SvgIconProps>;
  title: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  to: string;
}) => {
  const blueColor = token("light").primary[500];
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <ListItem disablePadding>
      <NavLink
        to={to}
        style={{
          textDecoration: "none",
          width: "100%",
        }}
        onClick={() => {
          if (isMobile) {
            setOpen(false);
          }
        }}
      >
        {({ isActive }) => (
          <ListItemButton
            sx={[
              {
                minHeight: 48,
                px: 2.5,
              },
              open
                ? {
                    justifyContent: "initial",
                  }
                : {
                    justifyContent: "center",
                  },
            ]}
          >
            <ListItemIcon
              sx={[
                {
                  minWidth: 0,
                  justifyContent: "center",
                  color: isActive ? blueColor : "text.secondary",
                },
                open
                  ? {
                      mr: 2,
                    }
                  : {
                      mr: "auto",
                    },
              ]}
            >
              {icon}
            </ListItemIcon>
            <ListItemText
              secondary={title}
              sx={[
                {
                  "& .MuiListItemText-secondary": {
                    color: isActive ? blueColor : "text.secondary",
                  },
                },
                open
                  ? {
                      opacity: 1,
                    }
                  : {
                      opacity: 0,
                    },
              ]}
            />
          </ListItemButton>
        )}
      </NavLink>
    </ListItem>
  );
};

const DrawerMenu = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <List>
      <MenuItem
        icon={<DashboardIcon />}
        title="Dashboard"
        open={open}
        setOpen={setOpen}
        to="/"
      />
      <MenuItem
        icon={<SettingsOutlinedIcon />}
        title="Settings"
        open={open}
        setOpen={setOpen}
        to="/settings"
      />
    </List>
  );
};

export default DrawerMenu;
