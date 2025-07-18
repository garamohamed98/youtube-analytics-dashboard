import { useSelector } from "react-redux";
import { useAppDispatch } from "../useAppDispatch";
import {
  selectChannelAutoRefresh,
  selectChannelDetails,
  selectChannelDetailsError,
  selectChannelDetailsStatus,
  selectChannelId,
  selectChannelURL,
  selectVideoPaginatedData,
} from "../../features/channel/channelSelectors";
import {
  clearChannelStates,
  disableAutoRefresh,
  enableAutoRefresh,
  setURL,
} from "../../features/channel/channelSlice";
import {
  getChannelDetails,
  getChannelDetailsRealTime,
  getVideosDetails,
} from "../../features/channel/channelThunks";
import extractPath from "../../utils/extractPath";
import { useCallback, useRef } from "react";

export const useChannel = () => {
  const dispatch = useAppDispatch();
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const channelDetails = useSelector(selectChannelDetails);
  const channelDetailsError = useSelector(selectChannelDetailsError);
  const channelDetailsStatus = useSelector(selectChannelDetailsStatus);
  const channelId = useSelector(selectChannelId);
  const URL = useSelector(selectChannelURL);
  const autoRefresh = useSelector(selectChannelAutoRefresh);
  const videoPaginatedData = useSelector(selectVideoPaginatedData);

  const startAutoRefresh = useCallback(
    (interval: number = 300000) => {
      // I set the intervall too big i have limited use of youtube api v3 in every day
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      dispatch(enableAutoRefresh());
      intervalRef.current = setInterval(() => {
        if (URL) {
          const pathData = extractPath(URL);
          if (pathData) {
            dispatch(getChannelDetailsRealTime(pathData));
          }
        }
      }, interval);
    },
    [dispatch, URL]
  );

  const stopAutoRefresh = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    dispatch(disableAutoRefresh());
  }, [dispatch]);

  const fetchChannel = useCallback(
    (url: string) => {
      const pathData = extractPath(url);
      if (autoRefresh.enabled === false) {
        dispatch(getChannelDetails(pathData));
        return;
      }
      stopAutoRefresh();

      if (pathData) {
        dispatch(getChannelDetails(pathData))
          .unwrap()
          .then(() => {
            startAutoRefresh();
          });
        return;
      }
      return;
    },
    [dispatch, stopAutoRefresh, startAutoRefresh, autoRefresh.enabled]
  );

  return {
    state: {
      channelDetails,
      channelDetailsError,
      channelDetailsStatus,
      channelId,
      URL,
      query: extractPath(URL)?.path,
      isAutoRefreshEnabled: autoRefresh.enabled,
      videoPaginatedData,
    },
    actions: {
      updateUrl: (url: string) => dispatch(setURL(url)),
      fetchChannel,
      clearChannelState: () => dispatch(clearChannelStates()),
      startAutoRefresh,
      stopAutoRefresh,
      getChannelVideosData: (pageToken: string) =>
        dispatch(getVideosDetails({ id: channelId, pageToken })),
    },
  };
};
