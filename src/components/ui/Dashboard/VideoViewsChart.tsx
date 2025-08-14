import { Box, CardContent, Typography } from "@mui/material";
import DashboardCard from "../../common/DashboardCard/DashboardCard";
import BarChart from "../../common/BarChart/BarChart";

const VideoViewsChart = () => {
  return (
    <DashboardCard filled={true} sx={{ height: 500 }}>
      <CardContent>
        <Box py="10px">
          <Typography variant="h2">Video Views Chart</Typography>
        </Box>
        <Box height={400}>
          <BarChart data={[1500]} labels={["video1"]} label="views" />
        </Box>
      </CardContent>
    </DashboardCard>
  );
};

export default VideoViewsChart;
