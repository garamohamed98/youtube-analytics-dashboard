import type { RootState } from "../../app/store";

export const selectChannelData = (state: RootState) => state.channel.data;
export const selectChannelError = (state: RootState) => state.channel.error;
export const selectChannelStatus = (state: RootState) => state.channel.status;
