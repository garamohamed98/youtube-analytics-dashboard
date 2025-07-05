import { Box, Divider } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useChannel } from "../../hooks/channel/useChannel";
import CardStatisticsList from "../../components/ui/Dashboard/CardStatisticsList";
import { useEffect } from "react";

const Dashboard = () => {
  const {
    state: { searchAndLoadstatus, searchAndLoardError },
    actions: { startAutoRefresh, stopAutoRefresh },
  } = useChannel();

  useEffect(() => {
    startAutoRefresh();
    
    return () => {
      stopAutoRefresh();
    };
  }, []);

  if (searchAndLoadstatus === "failed")
    return <Box>error: {searchAndLoardError}</Box>;

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid size={{ xs: 12, md: 12 }}>
        <Divider />
      </Grid>
      <Grid size={{ xs: 12, md: 12 }}>
        <CardStatisticsList />
      </Grid>
    </Grid>
  );
};

export default Dashboard;
