import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getChannelByCustomNameAPI,
  getChannelByIdAPI,
  getChannelByTagAPI,
  getChannelByUsernameAPI,
  getChannelVideosAPI,
  getChannelVideosDetailsAPI,
} from "./channelAPI";
import type { videoGridRow } from "./channelTypes";

const fetchChannelDetails = async (
  props: { format: string; path: string } | null,
  { rejectWithValue }: { rejectWithValue: (value: any) => any }
) => {
  try {
    if (!props) {
      return rejectWithValue("No parameter is provided");
    }
    const { format, path } = props;
    if (!format) {
      return rejectWithValue("No form is provided");
    }
    if (!path) {
      return rejectWithValue("No path is provided");
    }
    if (format === "id") {
      const directIdResult = await getChannelByIdAPI(path);
      if (!directIdResult.items || directIdResult.items.length < 1) {
        return rejectWithValue("The id have no channel");
      }
      return directIdResult;
    }
    if (format === "tag" || format === "username" || format === "custom") {
      const searchResult = await (format === "tag"
        ? getChannelByTagAPI(path)
        : format === "username"
        ? getChannelByUsernameAPI(path)
        : getChannelByCustomNameAPI(path));
      if (
        !searchResult.items ||
        searchResult.items.length < 1 ||
        !searchResult.items[0].id.channelId
      ) {
        return rejectWithValue("channel not found");
      }
      const dataResult = await getChannelByIdAPI(
        searchResult.items[0].id.channelId
      );
      if (!dataResult.items || dataResult.items.length < 1) {
        return rejectWithValue("channel not found");
      }
      return dataResult;
    }

    return rejectWithValue("Invalid form");
  } catch (error: any) {
    return rejectWithValue(error.message || "Failed to fetch channel");
  }
};

export const getChannelDetails = createAsyncThunk(
  "channel/getChannelDetails",
  fetchChannelDetails
);

export const getChannelDetailsRealTime = createAsyncThunk(
  "channel/getChannelDetailsRealTime",
  fetchChannelDetails
);

export const getVideosDetails = createAsyncThunk(
  "channel/getVideosDetails",
  async (
    props: { id: string | null; pageToken: string | null },
    { rejectWithValue }
  ) => {
    try {
      if (!props) {
        return rejectWithValue("No props is provided");
      }
      const { id, pageToken } = props;
      if (!id) {
        return rejectWithValue("No id is provided");
      }
      if (pageToken === null) {
        return rejectWithValue("No pageToken is provided");
      }
      const channelVideosResponse = await getChannelVideosAPI(id, pageToken);

      if (
        !channelVideosResponse.items ||
        channelVideosResponse.items.length < 1
      )
        return {
          videoGridRow: [],
          nextPageToken: null,
          prevPageToken: null,
          totalResults: null,
        };
      const videosIds = channelVideosResponse.items
        .map((item) => {
          return item.id.videoId;
        })
        .join(",");

      const channelVideosDetailsRespons = await getChannelVideosDetailsAPI(
        videosIds
      );
      if (
        !channelVideosDetailsRespons.items ||
        channelVideosDetailsRespons.items.length < 1
      )
        return {
          videoGridRow: [],
          nextPageToken: null,
          prevPageToken: null,
          totalResults: null,
        };
      const videosDetails = channelVideosDetailsRespons.items.map(
        (item): videoGridRow => {
          return {
            id: item.id,
            publishedAt: item.snippet.publishedAt,
            title: item.snippet.title,
            description: item.snippet.description,
            thumbnails: {
              url: item.snippet.thumbnails.maxres.url,
              width: item.snippet.thumbnails.maxres.width,
              height: item.snippet.thumbnails.maxres.height,
            },
            viewCount: item.statistics.viewCount,
            likeCount: item.statistics.likeCount,
            favoriteCount: item.statistics.favoriteCount,
            commentCount: item.statistics.commentCount,
          };
        }
      );
      return {
        videoGridRow: videosDetails,
        nextPageToken: channelVideosResponse.nextPageToken
          ? channelVideosResponse.nextPageToken
          : null,
        prevPageToken: channelVideosResponse.prevPageToken
          ? channelVideosResponse.prevPageToken
          : null,
        totalResults: channelVideosResponse.pageInfo.totalResults
          ? channelVideosResponse.pageInfo.totalResults
          : null,
      };
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch channel videos");
    }
  }
);
