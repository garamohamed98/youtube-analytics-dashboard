import type { RootState } from "../../app/store";

export const selectChannelData = (state: RootState) => state.channel.data;
export const selectChannelSearchAndLoadStatus = (state: RootState) =>
  state.channel.searchAndLoad.status;
export const selectChannelSearchAndLoadError = (state: RootState) =>
  state.channel.searchAndLoad.error;
export const selectChannelId = (state: RootState) => state.channel.channelId;
export const selectChannelURL = (state: RootState) => state.channel.URL;
export const selectChannelAutoRefresh = (state: RootState) =>
  state.channel.autoRefresh;
export const selectChannelVideosData = (state: RootState) =>
  state.channel.videosDetailsData;
