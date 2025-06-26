import { createSlice } from "@reduxjs/toolkit";
import { fetchChannel } from "./channelThunks";
import type { channel } from "./channelTypes";

interface initialState {
  data: channel | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: initialState = {
  data: null,
  status: "idle",
  error: null,
};

const channelSlice = createSlice({
  name: "channel",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChannel.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchChannel.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchChannel.rejected, (state, action) => {
        state.status = "failed";
        state.error = (action.payload as string) || "Unknown error";
      });
  },
});

export default channelSlice.reducer;
