import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getChannelByCustomNameAPI,
  getChannelByIdAPI,
  getChannelByTagAPI,
  getChannelByUsernameAPI,
  getChannelVideosAPI,
  getChannelVideosDetailsAPI,
} from "./channelAPI";
import type { channelVideoData } from "./channelTypes";

export const getChannelByTag = createAsyncThunk(
  "channel/getChannelByTag",
  async (tag: string, { rejectWithValue }) => {
    try {
      if (!tag) {
        return rejectWithValue("No parameter is provided");
      }
      return await getChannelByTagAPI(tag);
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch channel");
    }
  }
);

export const getChannelById = createAsyncThunk(
  "channel/getChannelById",
  async (id: string, { rejectWithValue }) => {
    try {
      if (!id) {
        return rejectWithValue("No parameter is provided");
      }
      return await getChannelByIdAPI(id);
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch channel");
    }
  }
);

export const getChannelByUsername = createAsyncThunk(
  "channel/getChannelByUsername",
  async (username: string, { rejectWithValue }) => {
    try {
      if (!username) {
        return rejectWithValue("No parameter is provided");
      }
      return await getChannelByUsernameAPI(username);
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch channel");
    }
  }
);

export const getChannelByCustomName = createAsyncThunk(
  "channel/getChannelByCustomName",
  async (customName: string, { rejectWithValue }) => {
    try {
      if (!customName) {
        return rejectWithValue("No parameter is provided");
      }
      return await getChannelByCustomNameAPI(customName);
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch channel");
    }
  }
);

const fetchChannelData = async (
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

export const getChannelData = createAsyncThunk(
  "channel/getChannelData",
  fetchChannelData
);

export const getChannelDataRealTime = createAsyncThunk(
  "channel/getChannelDataSilent",
  fetchChannelData
);

export const getChannelVideos = createAsyncThunk(
  "channel/getChannelVideos",
  async (props: { id: string; pageToken: string }, { rejectWithValue }) => {
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
      return getChannelVideosAPI(id, pageToken);
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch channel videos");
    }
  }
);

export const getChannelVideosData = createAsyncThunk(
  "channel/getChannelVideosData",
  async (
    props: { id: string | null; pageToken: string | null },
    { rejectWithValue }
  ) => {
    try {
      console.log("props of the thunk", props);

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
      console.log("channelVideosResponse: ", channelVideosResponse);

      if (
        !channelVideosResponse.items ||
        channelVideosResponse.items.length < 1
      )
        return [];
      const videosIds = channelVideosResponse.items
        .map((item) => {
          return item.id.videoId;
        })
        .join(",");
      console.log("videosIds ", videosIds);

      const channelVideosDetailsRespons = await getChannelVideosDetailsAPI(
        videosIds
      );
      console.log("channelVideosDetailsRespons: ", channelVideosDetailsRespons);
      if (
        !channelVideosDetailsRespons.items ||
        channelVideosDetailsRespons.items.length < 1
      )
        return [];
      const videosData = channelVideosDetailsRespons.items.map(
        (item): channelVideoData => {
          return {
            id:item.id,
            publishedAt: item.snippet.publishedAt,
            title: item.snippet.title,
            description: item.snippet.description,
            thumbnails: {
              url: item.snippet.thumbnails.default.url,
              width: item.snippet.thumbnails.default.width,
              height: item.snippet.thumbnails.default.height,
            },
            viewCount: item.statistics.viewCount,
            likeCount: item.statistics.likeCount,
            favoriteCount: item.statistics.favoriteCount,
            commentCount: item.statistics.commentCount,
          };
        }
      );
      return videosData;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch channel videos");
    }
  }
);
