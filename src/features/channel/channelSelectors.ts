import type { RootState } from "../../app/store";

export const selectChannelDetails = (state: RootState) =>
  state.channel.channelDetails;
export const selectChannelDetailsStatus = (state: RootState) =>
  state.channel.channelDetailsStatus.status;
export const selectChannelDetailsError = (state: RootState) =>
  state.channel.channelDetailsStatus.error;
export const selectChannelDetailsRealTimeStatus = (state: RootState) =>
  state.channel.channelDetailsRealTimeStatus.status;
export const selectChannelDetailsRealTimeError = (state: RootState) =>
  state.channel.channelDetailsRealTimeStatus.error;
export const selectChannelId = (state: RootState) => state.channel.channelId;
export const selectChannelURL = (state: RootState) => state.channel.URL;
export const selectChannelAutoRefresh = (state: RootState) =>
  state.channel.autoRefresh;
export const selectVideoPaginatedData = (state: RootState) =>
  state.channel.videoPaginatedData;
