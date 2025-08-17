import { Box, Typography } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useChannel } from "../../../../hooks/channel/useChannel";

const ChannelMetaData = () => {
  const {
    state: { channelDetails },
  } = useChannel();
  return (
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
          {channelDetails?.items[0].snippet.publishedAt.split("T")[0]}
        </Typography>
      </Box>
    </Box>
  );
};

export default ChannelMetaData;
