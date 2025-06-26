import { store } from "../../app/store.ts";
import { fetchChannel } from "../../features/channel/channelThunks.ts";

export async function loader() {
  await store.dispatch(fetchChannel());
  return null;
}
