import api from "../../services/api.ts";
import type {
  channelDetailsResponse,
  channelSearchResponse,
  videosDetails,
  videosSummaries,
} from "./channelTypes.ts";

export const getChannelByTagAPI = async (
  query: string
): Promise<channelSearchResponse> => {
  const response = await api.get("/search", {
    params: {
      part: "snippet",
      q: query,
      type: "channel",
      maxResults: 1,
    },
  });

  console.log("getChannelByTagApi: ", response.data);
  return response.data;
};

export const getChannelByIdAPI = async (
  id: string,
  timestamp?: number
): Promise<channelDetailsResponse> => {
  const response = await api.get("/channels", {
    params: {
      part: "snippet,statistics",
      id: id,
      timestamp: timestamp || Date.now(),
    },
  });
  console.log("getChannelByIdAPI: ", response.data);
  return response.data;
};

export const getChannelByUsernameAPI = async (
  username: string
): Promise<channelSearchResponse> => {
  const response = await api.get("/search", {
    params: {
      part: "snippet",
      q: username,
      type: "channel",
      maxResults: 1,
    },
  });
  console.log("getChannelByUsernamAPI: ", response.data);
  return response.data;
};

export const getChannelByCustomNameAPI = async (
  customName: string
): Promise<channelSearchResponse> => {
  const response = await api.get("/search", {
    params: {
      part: "snippet",
      q: customName,
      type: "channel",
      maxResults: 1,
    },
  });
  console.log("getChannelByCustomNameAPI: ", response.data);
  return response.data;
};

export const getChannelVideosAPI = async (
  id: string,
  pageToken: string
): Promise<videosSummaries> => {
  const response = await api.get("/search", {
    params: {
      part: "snippet",
      type: "video",
      channelId: id,
      maxResults: 4,
      order: "date",
      pageToken: pageToken,
    },
  });
  console.log("getChannelVideosAPI: ", response.data);
  return response.data;
};

export const getChannelVideosDetailsAPI = async (
  videoIds: string
): Promise<videosDetails> => {
  console.log("videosIds on api: ", videoIds);

  const response = await api.get("/videos", {
    params: {
      part: "snippet,statistics,contentDetails",
      id: videoIds,
    },
  });
  console.log("getChannelVideosDetailsAPI: ", response.data);
  return response.data;
};
