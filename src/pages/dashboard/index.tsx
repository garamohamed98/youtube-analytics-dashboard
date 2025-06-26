import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import {
  selectChannelData,
  selectChannelError,
  selectChannelStatus,
} from "../../features/channel/channelSelectors.ts";


const Dashboard = () => {
  const data = useSelector(selectChannelData);
  const error = useSelector(selectChannelError);
  const status = useSelector(selectChannelStatus);

  if (status === "failed") return <Box>error: {error} </Box>;

  return <Box>succed: {data?.kind} </Box>;
};

export default Dashboard;
