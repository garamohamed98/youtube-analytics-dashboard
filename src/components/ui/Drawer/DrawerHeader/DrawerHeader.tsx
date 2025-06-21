import MenuIcon from "@mui/icons-material/Menu";
import { Box, IconButton, useMediaQuery, useTheme } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const DrawerHeader = ({
  onToggle,
  open,
}: {
  onToggle: () => void;
  open: boolean;
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Box
      display="flex"
      p="10px"
      py="30px"
      justifyContent="space-between"
      alignItems="center"
    >
      {!isMobile && (
        <IconButton
          onClick={() => {
            onToggle();
          }}
        >
          <MenuIcon />
        </IconButton>
      )}
      <Box px="20px">
        <Box
          component="img"
          src="src/assets/logo.png"
          alt="logo"
          loading="lazy"
          sx={{
            width: "100%",
            maxWidth: 90,
            aspectRatio: "310 / 112",
            display: "block",
          }}
        />
      </Box>
      {isMobile && (
        <IconButton
          onClick={() => {
            onToggle();
          }}
        >
          <CloseIcon />
        </IconButton>
      )}
    </Box>
  );
};

export default DrawerHeader;
