import {
  Box,
  IconButton,
  Toolbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChannelInfo from "../ChannelInfo/ChannelInfo";
import ChannelMetaData from "../ChannelMetaData/ChannelMetaData";
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
      {!isMobile && (
        <Box
          display="flex"
          flexDirection={"row"}
          justifyContent="space-between"
          alignItems="center"
          width="100%"
          gap="10px"
          p="10px"
        >
          <ChannelInfo />
          <ChannelMetaData />
        </Box>
      )}
    </Toolbar>
  );
};

export default AppBarContent;
