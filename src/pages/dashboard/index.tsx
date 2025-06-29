import { Box } from "@mui/material";
import { useChannel } from "../../hooks/channel/useChannel.ts";

const Dashboard = () => {
  const {
    state: { data, error, status },
  } = useChannel();

  if (status === "failed") return <Box>error: {error} </Box>;

  return <Box>succed: {data?.kind} </Box>;
};

export default Dashboard;
