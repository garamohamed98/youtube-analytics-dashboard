import {
  Box,
  CardContent,
  Grid,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import DashboardCard from "../../common/DashboardCard/DashboardCard";
import { DataGrid, type GridPaginationModel } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useChannel } from "../../../hooks/channel/useChannel";
import type { channelVideoData } from "../../../features/channel/channelTypes";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const VideoTable = ({
  channelVideoData,
  handleNextPage,
  handlePreviousPage,
}: {
  channelVideoData: channelVideoData[] | null;
  handleNextPage: Function;
  handlePreviousPage: Function;
}) => {
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 4,
  });

  const handlePaginationModelChange = (newModel: GridPaginationModel) => {
    if (newModel.page > paginationModel.page) {
      handleNextPage();
    }
    if (newModel.page < paginationModel.page) {
      handlePreviousPage();
    }
    setPaginationModel(newModel);

    console.log(newModel);
  };
  return (
    <DashboardCard filled={true}>
      <CardContent>
        <Box>
          <Box py="10px">
            <Typography variant="h2">Video Metrics Table</Typography>
          </Box>
          <DataGrid
            slots={{
              columnHeaders: () => null,
            }}
            //scrollbarSize={0}
            //disableVirtualization
            paginationMode="server"
            rowCount={20}
            paginationModel={paginationModel}
            onPaginationModelChange={handlePaginationModelChange}
            getRowHeight={() => "auto"}
            columns={[
              {
                field: "Thumbnail",
                headerName: "Thumbnail",
                resizable: false,
                width: 100,
                renderCell: (params) => (
                  <Box
                    component="img"
                    src={params.row.thumbnails.url}
                    alt="thumbnail"
                    loading="lazy"
                    sx={{
                      width: "100%",
                      maxWidth: 90,
                      aspectRatio: `${params.row.thumbnails.width} / ${params.row.thumbnails.height}`,
                      borderRadius: "20%",
                      display: "block",
                    }}
                  />
                ),
              },
              {
                field: "title",
                headerName: "Title And Description",
                flex: 1,
                resizable: false,
                renderCell: (params) => (
                  <Box width="100%" display="flex" flexDirection="column">
                    <Typography variant="h2" color="text.secondary">
                      {params.row.title}
                    </Typography>
                    <Typography variant="h3" color="text.secondary">
                      {params.row.description}
                    </Typography>
                  </Box>
                ),
              },
              {
                field: "viewCount",
                headerName: "Views and Likes",
                resizable: false,
                width: 100,
                renderCell: (params) => (
                  <Box display="flex" flexDirection="column">
                    <Typography variant="h3" color="text.secondary">
                      Views: {params.row.viewCount}
                    </Typography>
                    <Typography variant="h3" color="text.secondary">
                      Likes: {params.row.likeCount}
                    </Typography>
                  </Box>
                ),
              },
              {
                field: "favoriteCount",
                headerName: "Favorites and comments",
                resizable: false,
                width: 100,
                renderCell: (params) => (
                  <Box>
                    <Typography variant="h3" color="text.secondary">
                      Comments: {params.row.commentCount}
                    </Typography>
                    <Typography variant="h3" color="text.secondary">
                      Favorites: {params.row.favoriteCount}
                    </Typography>
                  </Box>
                ),
              },
            ]}
            rows={channelVideoData ? channelVideoData : []}
            pageSizeOptions={[4]}
            getRowId={(row) => row.id}
          />
        </Box>
      </CardContent>
    </DashboardCard>
  );
};

const VideoCard = ({
  channelVideoData,
  handleNextPage,
  handlePreviousPage,
}: {
  channelVideoData: channelVideoData[] | null;
  handleNextPage: Function;
  handlePreviousPage: Function;
}) => {
  if (!channelVideoData) {
    return <Box>No videos</Box>;
  }
  return (
    <Box>
      <Typography variant="h2" sx={{ py: "20px" }}>
        Video Metrics List
      </Typography>
      <Box display={"flex"} flexDirection="column" gap="20px">
        {channelVideoData.map((video) => {
          return (
            <DashboardCard>
              <CardContent>
                <Box display="flex" flexDirection="column" gap="20px">
                  <Box
                    component="img"
                    src={video.thumbnails.url}
                    alt="thumbnail"
                    loading="lazy"
                    sx={{
                      width: "100%",
                      aspectRatio: `${video.thumbnails.width} / ${video.thumbnails.height}`,
                      borderRadius: "10px",
                      display: "block",
                    }}
                  />
                  <Box display={"flex"} flexDirection="column" gap="10px">
                    <Typography variant="h2" color="text.secondary">
                      {video.title}
                    </Typography>
                    <Typography variant="h3" color="text.secondary">
                      {video.description}
                    </Typography>
                  </Box>
                  <Grid container spacing={2} alignItems="center">
                    <Grid size={6}>
                      <Typography variant="h3" color="text.secondary">
                        Views
                      </Typography>
                    </Grid>
                    <Grid size={6}>
                      <Typography variant="h3" color="text.secondary">
                        {video.viewCount}
                      </Typography>
                    </Grid>
                    <Grid size={6}>
                      <Typography variant="h3" color="text.secondary">
                        Likes
                      </Typography>
                    </Grid>
                    <Grid size={6}>
                      <Typography variant="h3" color="text.secondary">
                        {video.likeCount}
                      </Typography>
                    </Grid>
                    <Grid size={6}>
                      <Typography variant="h3" color="text.secondary">
                        Comments
                      </Typography>
                    </Grid>
                    <Grid size={6}>
                      <Typography variant="h3" color="text.secondary">
                        {video.commentCount}
                      </Typography>
                    </Grid>
                    <Grid size={6}>
                      <Typography variant="h3" color="text.secondary">
                        Favorites
                      </Typography>
                    </Grid>
                    <Grid size={6}>
                      <Typography variant="h3" color="text.secondary">
                        {video.favoriteCount}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </CardContent>
            </DashboardCard>
          );
        })}
      </Box>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="center"
        gap="20px"
        alignItems="center"
        p="10px"
      >
        <IconButton>
          <ArrowBackIosNewIcon />
        </IconButton>
        1-4 of 20
        <IconButton>
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

const VideoList = () => {
  const {
    state: { channelVideoData, URL },
    actions: { getChannelVideosData },
  } = useChannel();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    getChannelVideosData("");
  }, [URL]);

  const handleNextPage = () => {};

  const handlePreviousPage = () => {};

  if (isMobile) {
    return (
      <VideoCard
        channelVideoData={channelVideoData}
        handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}
      />
    );
  } else {
    return (
      <VideoTable
        channelVideoData={channelVideoData}
        handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}
      />
    );
  }
};

export default VideoList;
