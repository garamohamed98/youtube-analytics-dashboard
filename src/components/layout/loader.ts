import { store } from "../../app/store.ts";
import { setURL } from "../../features/channel/channelSlice.ts";
import {
  getChannelDetails,
  getVideosDetails,
} from "../../features/channel/channelThunks.ts";
import extractQuery from "../../utils/extractPath.ts";

export async function loader() {
  const url = "https://www.youtube.com/@Gymology";
  store.dispatch(setURL(url));
  await store.dispatch(getChannelDetails(extractQuery(url)));
  const channelId = store.getState().channel.channelId;
  if (!channelId) {
    console.error("channel ID not found");
    return;
  }
  await store.dispatch(getVideosDetails({ id: channelId, pageToken: "" }));
  return;
}
