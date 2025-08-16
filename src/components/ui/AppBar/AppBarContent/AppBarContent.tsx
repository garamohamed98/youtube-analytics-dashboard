import {
  Box,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
const AppBarContent = ({ handleToggle }: { handleToggle: Function }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const onClickMenu = () => {
    handleToggle();
  };
  return (
    <Toolbar>
      {isMobile && (
        <IconButton onClick={onClickMenu}>
          <MenuIcon />
        </IconButton>
      )}
      <Box display="flex" flexDirection="column" gap="3px" sx={{ flexGrow: 1 }}>
        <Typography variant="h2">title</Typography>
        <Typography variant="h3" color="text.secondary">
          subtile
        </Typography>
      </Box>
      <Box
        bgcolor="background.paper"
        border="1px solid"
        borderColor="text.secondary"
        display="flex"
        flexDirection="row"
        height="30px"
        width="170px"
        borderRadius="5px"
      >
        <Box
          borderRight="1px solid"
          borderColor="text.secondary"
          display="flex"
          alignItems="center"
          justifyContent="center"
          px={1.5}
        >
          <CalendarMonthIcon sx={{ color: "text.secondary", height: "18px" }} />
        </Box>
        <Box
          width="100%"
          height="100%"
          flex={1}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant="h3" color="text.secondary">
            2025/12/25
          </Typography>
        </Box>
      </Box>
    </Toolbar>
  );
};

export default AppBarContent;
