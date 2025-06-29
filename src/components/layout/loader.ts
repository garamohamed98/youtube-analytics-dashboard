import { store } from "../../app/store.ts";
import { setURL } from "../../features/channel/channelSlice.ts";
import { getChannelData } from "../../features/channel/channelThunks.ts";
import extractQuery from "../../utils/extractPath.ts";

export async function loader() {
  const url = "https://www.youtube.com/@Gymology";
  store.dispatch(setURL(url));
  await store.dispatch(getChannelData(extractQuery(url)));
  return null;
}
