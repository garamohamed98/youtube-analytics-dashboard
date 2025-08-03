import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {
  getChannelDetails,
  getChannelDetailsRealTime,
  getVideosDetails,
  getVideosDetailsRealTime,
} from "./channelThunks";
import type {
  channelDetailsResponse,
  videoPaginatedData,
} from "./channelTypes";

interface initialState {
  URL: null | string;
  channelDetails: channelDetailsResponse | null;
  videoPaginatedData: videoPaginatedData | null;
  channelId: null | string;
  autoRefresh: {
    enabled: boolean;
    timeoutId: number | null;
  };
  channelDetailsStatus: {
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
  };
  channelDetailsRealTimeStatus: {
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
  };
  videoPaginatedDataStatus: {
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
  };
  videoPaginatedRealTimeDataStatus: {
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
  };
}

const initialState: initialState = {
  URL: null,
  channelDetails: null,
  channelId: null,
  videoPaginatedData: null,
  autoRefresh: {
    enabled: false,
    timeoutId: null,
  },
  channelDetailsStatus: {
    status: "idle",
    error: null,
  },
  channelDetailsRealTimeStatus: {
    status: "idle",
    error: null,
  },
  videoPaginatedDataStatus: {
    status: "idle",
    error: null,
  },
  videoPaginatedRealTimeDataStatus: {
    status: "idle",
    error: null,
  },
};

const channelSlice = createSlice({
  name: "channel",
  initialState,
  reducers: {
    setURL: (state, action: PayloadAction<string>) => {
      state.URL = action.payload;
    },
    clearChannelStates: (state) => {
      state.URL = null;
      state.channelDetails = null;
      state.channelId = null;
      state.channelDetailsStatus.status = "idle";
      state.channelDetailsStatus.error = null;
      if (state.autoRefresh.timeoutId) {
        clearTimeout(state.autoRefresh.timeoutId);
        state.autoRefresh.timeoutId = null;
      }
    },
    enableAutoRefresh: (state) => {
      state.autoRefresh.enabled = true;
    },
    disableAutoRefresh: (state) => {
      state.autoRefresh.enabled = false;
    },
    setAutoRefreshTimeout: (state, action: PayloadAction<number>) => {
      state.autoRefresh.timeoutId = action.payload;
    },
    clearAutoRefreshTimeout: (state) => {
      if (state.autoRefresh.timeoutId) {
        clearTimeout(state.autoRefresh.timeoutId);
        state.autoRefresh.timeoutId = null;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getChannelDetails.pending, (state) => {
        state.channelDetailsStatus.status = "loading";
      })
      .addCase(getChannelDetails.fulfilled, (state, action) => {
        state.channelDetailsStatus.status = "succeeded";
        state.channelDetails = action.payload;
        if (action.payload.items && action.payload.items.length > 0) {
          state.channelId = action.payload.items[0].id;
        } else {
          state.channelId = null;
        }
      })
      .addCase(getChannelDetails.rejected, (state, action) => {
        state.channelDetailsStatus.status = "failed";
        state.channelDetailsStatus.error =
          (action.payload as string) || "Unknown error";
      })
      .addCase(getChannelDetailsRealTime.pending, (state) => {
        state.channelDetailsRealTimeStatus.status = "loading";
      })
      .addCase(getChannelDetailsRealTime.fulfilled, (state, action) => {
        state.channelDetailsRealTimeStatus.status = "succeeded";
        state.channelDetails = action.payload;
        if (action.payload.items && action.payload.items.length > 0) {
          state.channelId = action.payload.items[0].id;
        } else {
          state.channelId = null;
        }
      })
      .addCase(getChannelDetailsRealTime.rejected, (state, action) => {
        state.channelDetailsRealTimeStatus.status = "failed";
        state.channelDetailsRealTimeStatus.error =
          (action.payload as string) || "Unknown error";
      })
      .addCase(getVideosDetails.pending, (state) => {
        state.videoPaginatedDataStatus.status = "loading";
      })
      .addCase(getVideosDetails.fulfilled, (state, action) => {
        state.videoPaginatedDataStatus.status = "succeeded";
        state.videoPaginatedData = action.payload;
      })
      .addCase(getVideosDetails.rejected, (state, action) => {
        state.videoPaginatedDataStatus.status = "failed";
        state.videoPaginatedDataStatus.error =
          (action.payload as string) || "Unknown error";
      })
      .addCase(getVideosDetailsRealTime.pending, (state) => {
        state.videoPaginatedRealTimeDataStatus.status = "loading";
      })
      .addCase(getVideosDetailsRealTime.fulfilled, (state, action) => {
        state.videoPaginatedRealTimeDataStatus.status = "succeeded";
        state.videoPaginatedData = action.payload;
      })
      .addCase(getVideosDetailsRealTime.rejected, (state, action) => {
        state.videoPaginatedRealTimeDataStatus.status = "failed";
        state.videoPaginatedRealTimeDataStatus.error =
          (action.payload as string) || "Unkown error";
      });
  },
});

export const {
  clearChannelStates,
  setURL,
  enableAutoRefresh,
  disableAutoRefresh,
  setAutoRefreshTimeout,
  clearAutoRefreshTimeout,
} = channelSlice.actions;
export default channelSlice.reducer;
