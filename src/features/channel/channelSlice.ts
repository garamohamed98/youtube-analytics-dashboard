import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {
  getChannelByCustomName,
  getChannelById,
  getChannelByTag,
  getChannelByUsername,
  getChannelData,
  getChannelDataRealTime,
  getChannelVideos,
  getChannelVideosData,
} from "./channelThunks";
import type {
  channelDetailsResponse,
  channelSearchResponse,
  channelVideoData,
  channelVideosList,
} from "./channelTypes";

interface initialState {
  URL: null | string;
  searchResult: channelSearchResponse | null;
  data: channelDetailsResponse | null;
  videosListData: channelVideosList | null;
  videosDetailsData: channelVideoData[] | null;
  channelId: null | string;
  autoRefresh: {
    enabled: boolean;
    timeoutId: number | null;
  };
  search: {
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
  };
  load: {
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
  };
  searchAndLoad: {
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
  };
  dataRealTime: {
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
  };
  videosList: {
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
  };
  videosDetails: {
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
  };
}

const initialState: initialState = {
  URL: null,
  searchResult: null,
  data: null,
  channelId: null,
  videosListData: null,
  videosDetailsData: null,
  autoRefresh: {
    enabled: false,
    timeoutId: null,
  },
  search: {
    status: "idle",
    error: null,
  },
  load: {
    status: "idle",
    error: null,
  },
  searchAndLoad: {
    status: "idle",
    error: null,
  },
  dataRealTime: {
    status: "idle",
    error: null,
  },
  videosList: {
    status: "idle",
    error: null,
  },
  videosDetails: {
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
      state.searchResult = null;
      state.data = null;
      state.channelId = null;
      state.search.status = "idle";
      state.search.error = null;
      state.load.status = "idle";
      state.load.error = null;
      state.searchAndLoad.status = "idle";
      state.searchAndLoad.error = null;
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
      .addCase(getChannelByTag.pending, (state) => {
        state.search.status = "loading";
      })
      .addCase(getChannelByTag.fulfilled, (state, action) => {
        state.search.status = "succeeded";
        state.searchResult = action.payload;
        if (
          action.payload.items &&
          action.payload.items.length > 0 &&
          action.payload.items[0].id
        ) {
          state.channelId = action.payload.items[0].id.channelId;
        } else {
          state.channelId = null;
        }
      })
      .addCase(getChannelByTag.rejected, (state, action) => {
        state.search.status = "failed";
        state.search.error = (action.payload as string) || "Unknown error";
      })
      .addCase(getChannelById.pending, (state) => {
        state.load.status = "loading";
      })
      .addCase(getChannelById.fulfilled, (state, action) => {
        state.load.status = "succeeded";
        state.data = action.payload;
        if (action.payload.items && action.payload.items.length > 0) {
          state.channelId = action.payload.items[0].id;
        } else {
          state.channelId = null;
        }
      })
      .addCase(getChannelById.rejected, (state, action) => {
        state.load.status = "failed";
        state.load.error = (action.payload as string) || "Unknown error";
      })
      .addCase(getChannelByUsername.pending, (state) => {
        state.search.status = "loading";
      })
      .addCase(getChannelByUsername.fulfilled, (state, action) => {
        state.search.status = "succeeded";
        state.searchResult = action.payload;
        if (
          action.payload.items &&
          action.payload.items.length > 0 &&
          action.payload.items[0].id
        ) {
          state.channelId = action.payload.items[0].id.channelId;
        } else {
          state.channelId = null;
        }
      })
      .addCase(getChannelByUsername.rejected, (state, action) => {
        state.search.status = "failed";
        state.search.error = (action.payload as string) || "Unknown error";
      })
      .addCase(getChannelByCustomName.pending, (state) => {
        state.search.status = "loading";
      })
      .addCase(getChannelByCustomName.fulfilled, (state, action) => {
        state.search.status = "succeeded";
        state.searchResult = action.payload;
        if (
          action.payload.items &&
          action.payload.items.length > 0 &&
          action.payload.items[0].id
        ) {
          state.channelId = action.payload.items[0].id.channelId;
        } else {
          state.channelId = null;
        }
      })
      .addCase(getChannelByCustomName.rejected, (state, action) => {
        state.search.status = "failed";
        state.search.error = (action.payload as string) || "Unknown error";
      })
      .addCase(getChannelData.pending, (state) => {
        state.searchAndLoad.status = "loading";
      })
      .addCase(getChannelData.fulfilled, (state, action) => {
        state.searchAndLoad.status = "succeeded";
        state.data = action.payload;
        if (action.payload.items && action.payload.items.length > 0) {
          state.channelId = action.payload.items[0].id;
        } else {
          state.channelId = null;
        }
      })
      .addCase(getChannelData.rejected, (state, action) => {
        state.searchAndLoad.status = "failed";
        state.searchAndLoad.error =
          (action.payload as string) || "Unknown error";
      })
      .addCase(getChannelDataRealTime.pending, (state) => {
        state.dataRealTime.status = "loading";
      })
      .addCase(getChannelDataRealTime.fulfilled, (state, action) => {
        state.dataRealTime.status = "succeeded";
        state.data = action.payload;
        if (action.payload.items && action.payload.items.length > 0) {
          state.channelId = action.payload.items[0].id;
        } else {
          state.channelId = null;
        }
      })
      .addCase(getChannelDataRealTime.rejected, (state, action) => {
        state.dataRealTime.status = "failed";
        state.dataRealTime.error =
          (action.payload as string) || "Unknown error";
      })
      .addCase(getChannelVideos.pending, (state) => {
        state.videosList.status = "loading";
      })
      .addCase(getChannelVideos.fulfilled, (state, action) => {
        state.videosList.status = "succeeded";
        state.videosListData = action.payload;
      })
      .addCase(getChannelVideos.rejected, (state, action) => {
        state.videosList.status = "failed";
        state.videosList.error = (action.payload as string) || "Unknown error";
      })
      .addCase(getChannelVideosData.pending, (state) => {
        state.videosDetails.status = "loading";
      })
      .addCase(getChannelVideosData.fulfilled, (state, action) => {
        state.videosDetails.status = "succeeded";
        state.videosDetailsData = action.payload;
      })
      .addCase(getChannelVideosData.rejected, (state, action) => {
        state.videosList.status = "failed";
        state.videosList.error = (action.payload as string) || "Unknown error";
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
