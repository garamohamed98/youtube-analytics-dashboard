import { Box, CardContent, Typography } from "@mui/material";
import DashboardCard from "../../common/DashboardCard/DashboardCard";
import { DataGrid, type GridPaginationModel } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useChannel } from "../../../hooks/channel/useChannel";

const VideosTable = () => {
  const {
    state: { channelVideoData, URL },
    actions: { getChannelVideosData },
  } = useChannel();
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 4,
  });

  useEffect(() => {
    getChannelVideosData("");
  }, [URL]);

  const handleNextPage = () => {};

  const previousPage = () => {};

  const handlePaginationModelChange = (newModel: GridPaginationModel) => {
    if (newModel.page > paginationModel.page) {
      handleNextPage();
    }
    if (newModel.page < paginationModel.page) {
      previousPage();
    }
    setPaginationModel(newModel);

    console.log(newModel);
  };
  console.log("channel data", channelVideoData);
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

export default VideosTable;
