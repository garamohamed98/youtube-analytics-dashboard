import { Box, CardContent, Typography } from "@mui/material";
import DashboardCard from "../../common/DashboardCard/DashboardCard";
import BarChart from "../../common/BarChart/BarChart";
import { useChannel } from "../../../hooks/channel/useChannel";

const VideoViewsChart = () => {
  const {
    state: { videoPaginatedData },
  } = useChannel();
  console.log(videoPaginatedData);
  const data = videoPaginatedData?.videoGridRow.map((video) => {
    return Number(video.viewCount);
  });

  const labels = videoPaginatedData?.videoGridRow.map((video) => {
    return video.publishedAt.split("T")[0].split("-").slice(-2).join("/");
  });

  const tooltip = videoPaginatedData?.videoGridRow.map((video) => {
    return video.title;
  });

  return (
    <DashboardCard filled={true} sx={{ height: 500 }}>
      <CardContent>
        <Box py="10px">
          <Typography variant="h2">Video Views Chart</Typography>
        </Box>
        <Box height={400}>
          <BarChart
            data={data ? data : []}
            labels={labels ? labels : []}
            label="views"
            tooltip={tooltip ? tooltip : []}
          />
        </Box>
      </CardContent>
    </DashboardCard>
  );
};

export default VideoViewsChart;
