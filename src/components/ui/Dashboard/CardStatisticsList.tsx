import { CardContent, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import DashboardCard from "../../common/DashboardCard/DashboardCard";
import { useChannel } from "../../../hooks/channel/useChannel";

const CardStatisticsList = () => {
  const {
    state: { channelDetails },
  } = useChannel();

  const viewCount = `${Number(channelDetails?.items[0]?.statistics.viewCount) / 1000}k`;
  const subscriberCount =
    channelDetails?.items[0]?.statistics.hiddenSubscriberCount === true
      ? "subscriber are hiden"
      : `${Number(channelDetails?.items[0]?.statistics.subscriberCount) / 1000}k`;
  const videoCount = channelDetails?.items[0]?.statistics.videoCount;

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid size={{ xs: 12, md: 4 }}>
        <DashboardCard filled={false}>
          <CardContent>
            <Typography variant="h3" color="text.secondary">
              View Count
            </Typography>
            <Typography variant="h2">
              {!!channelDetails?.items[0]?.statistics.viewCount && viewCount}
            </Typography>
          </CardContent>
        </DashboardCard>
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <DashboardCard filled={false}>
          <CardContent>
            <Typography variant="h3" color="text.secondary">
              Subscriber Count
            </Typography>
            <Typography variant="h2">
              {!!channelDetails?.items[0]?.statistics.subscriberCount &&
                subscriberCount}
            </Typography>
          </CardContent>
        </DashboardCard>
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <DashboardCard filled={false}>
          <CardContent>
            <Typography variant="h3" color="text.secondary">
              Video Count
            </Typography>
            <Typography variant="h2">
              {!!channelDetails?.items[0]?.statistics.videoCount && videoCount}
            </Typography>
          </CardContent>
        </DashboardCard>
      </Grid>
    </Grid>
  );
};

export default CardStatisticsList;
