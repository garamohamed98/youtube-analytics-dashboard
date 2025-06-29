import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getChannelByIdAPI,
  getChannelByTagAPI,
  getChannelByUsernameAPI,
} from "./channelAPI";

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
      return await getChannelByUsernameAPI(customName);
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch channel");
    }
  }
);

export const getChannelData = createAsyncThunk(
  "channel/getChannelData",
  async (
    props: { format: string; path: string } | null,
    { dispatch, rejectWithValue }
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
        console.log("it's an id format");
        const directIdResult = await dispatch(getChannelById(path)).unwrap();
        if (!directIdResult.items || directIdResult.items.length < 1) {
          return rejectWithValue("The id have no channel");
        }
        return directIdResult;
      }
      if (format === "tag" || format === "username" || format === "custom") {
        const searchResult = await dispatch(
          format === "tag"
            ? getChannelByTag(path)
            : format === "username"
            ? getChannelByUsername(path)
            : getChannelByCustomName(path)
        ).unwrap();
        if (
          !searchResult.items ||
          searchResult.items.length < 1 ||
          !searchResult.items[0].id.channelId
        ) {
          return rejectWithValue("channel not found");
        }
        const dataResult = await dispatch(
          getChannelById(searchResult.items[0].id.channelId)
        ).unwrap();
        if (!dataResult.items || dataResult.items.length < 1) {
          return rejectWithValue("channel not found");
        }
        return dataResult;
      }

      return rejectWithValue("Invalid form");
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch channel");
    }
  }
);
