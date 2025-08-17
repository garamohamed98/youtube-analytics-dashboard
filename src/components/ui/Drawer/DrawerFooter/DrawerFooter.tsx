import { Box, useMediaQuery, useTheme } from "@mui/material";
import ChannelInfo from "../../AppBar/ChannelInfo/ChannelInfo";
import ChannelMetaData from "../../AppBar/ChannelMetaData/ChannelMetaData";

const DrawerFooter = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <>
      {isMobile && (
        <Box px="20px" display="flex" flexDirection="column" gap="15px">
          <ChannelInfo />
          <ChannelMetaData />
        </Box>
      )}
    </>
  );
};

export default DrawerFooter;
