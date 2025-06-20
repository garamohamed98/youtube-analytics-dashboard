import MenuIcon from "@mui/icons-material/Menu";
import { Box, IconButton } from "@mui/material";

const DrawerHeader = ({ onToggle }: { onToggle: () => void }) => {
  return (
    <Box display="flex" p="10px">
      <IconButton
        onClick={() => {
          onToggle();
        }}
      >
        <MenuIcon />
      </IconButton>
    </Box>
  );
};

export default DrawerHeader;
