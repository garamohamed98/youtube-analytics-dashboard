import { Box, Typography } from "@mui/material";
import { useChannel } from "../../../../hooks/channel/useChannel";

const ChannelInfo = () => {
  const {
    state: { channelDetails },
  } = useChannel();
  return (
    <Box display="flex" flexDirection="column" gap="3px">
      <Typography variant="h2" color="text.primary">
        {channelDetails?.items[0].snippet.title}
      </Typography>
      <Typography variant="h3" color="text.secondary">
        {channelDetails?.items[0].snippet.customUrl}
      </Typography>
    </Box>
  );
};

export default ChannelInfo;
