import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

const DrawerMenu = ({ open }: { open: boolean }) => {
  return (
    <List>
      <ListItem disablePadding>
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
            <SettingsOutlinedIcon />
          </ListItemIcon>
          <ListItemText
            secondary="Settings"
            sx={[
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
      </ListItem>
    </List>
  );
};

export default DrawerMenu;
