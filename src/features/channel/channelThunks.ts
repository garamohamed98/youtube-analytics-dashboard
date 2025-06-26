import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchChannelAPI } from "./channelAPI";

export const fetchChannel = createAsyncThunk(
  "channel/fetchChannel",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchChannelAPI();
    } catch (err: any) {
      return rejectWithValue(err.message || "Failed to fetch channel");
    }
  }
);
