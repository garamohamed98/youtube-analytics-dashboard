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
  getVideosDetailsRealTime,
} from "../../features/channel/channelThunks";
import extractPath from "../../utils/extractPath";
import { useCallback, useEffect, useRef } from "react";

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

  const currentValuesRef = useRef({
    videoPaginatedData,
    channelId,
    URL,
    autoRefresh,
  });

  useEffect(() => {
    currentValuesRef.current = {
      videoPaginatedData,
      channelId,
      URL,
      autoRefresh,
    };
  }, [videoPaginatedData, channelId, URL, autoRefresh]);

  const startAutoRefresh = useCallback(
    (interval: number = 30000) => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      dispatch(enableAutoRefresh());
      intervalRef.current = setInterval(async () => {
        const { videoPaginatedData, channelId, URL } = currentValuesRef.current;
        if (URL) {
          const pathData = extractPath(URL);
          if (pathData) {
            const resultChannelDetails = await dispatch(
              getChannelDetailsRealTime(pathData)
            );
            if (
              getChannelDetailsRealTime.fulfilled.match(resultChannelDetails) &&
              resultChannelDetails.payload.items &&
              resultChannelDetails.payload.items.length > 0
            ) {
              dispatch(
                getVideosDetailsRealTime({
                  id: channelId,
                  pageToken: videoPaginatedData?.currentPageToken
                    ? videoPaginatedData.currentPageToken
                    : "",
                })
              );
            }
          }
        }
      }, interval);
    },
    [dispatch]
  );

  const stopAutoRefresh = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    dispatch(disableAutoRefresh());
  }, [dispatch]);

  const fetchChannel = useCallback(
    async (url: string) => {
      const pathData = extractPath(url);
      if (!pathData) return;
      if (autoRefresh.enabled) {
        stopAutoRefresh();
      }
      try {
        const resultChannelDetails = await dispatch(
          getChannelDetails(pathData)
        );

        await dispatch(
          getVideosDetails({
            id: resultChannelDetails.payload.items[0].id,
            pageToken: "",
          })
        );
      } catch (error) {
        console.error("Failed to fetch data", error);
      } finally {
        if (autoRefresh.enabled) {
          startAutoRefresh();
        }
      }
      return;
    },
    [
      dispatch,
      stopAutoRefresh,
      startAutoRefresh,
      autoRefresh.enabled,
      channelId,
    ]
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
