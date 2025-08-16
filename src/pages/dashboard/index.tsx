import { Box, Divider } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useChannel } from "../../hooks/channel/useChannel";
import CardStatisticsList from "../../components/ui/Dashboard/CardStatisticsList";
import { useEffect } from "react";
import VideosTable from "../../components/ui/Dashboard/VideoList";
import VideoViewsChart from "../../components/ui/Dashboard/VideoViewsChart";

const Dashboard = () => {
  const {
    state: { channelDetailsStatus, channelDetailsError },
    actions: { startAutoRefresh, stopAutoRefresh },
  } = useChannel();

  useEffect(() => {
    startAutoRefresh();

    return () => {
      stopAutoRefresh();
    };
  }, []);

  if (channelDetailsStatus === "failed")
    return <Box>error: {channelDetailsError}</Box>;

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid size={{ xs: 12, md: 12 }}>
        <Divider />
      </Grid>
      <Grid size={{ xs: 12, md: 12 }}>
        <CardStatisticsList />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <VideoViewsChart />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <VideosTable />
      </Grid>
    </Grid>
  );
};

export default Dashboard;
