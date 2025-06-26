import api from "../../services/api.ts";
import type { channel } from "./channelTypes.ts";

export const fetchChannelAPI = async (): Promise<channel> => {
  const response = await api.get("/search", {
    params: {
      part: "snippet",
      q: "Gymology-l9d",
      type: "channel",
    },
  });
  return response.data;
};
