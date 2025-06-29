import { useSelector } from "react-redux";
import { useAppDispatch } from "../useAppDispatch";
import {
  selectChannelData,
  selectChannelId,
  selectChannelSearchAndLoadError,
  selectChannelSearchAndLoadStatus,
  selectChannelURL,
} from "../../features/channel/channelSelectors";
import {
  clearChannelStates,
  setURL,
} from "../../features/channel/channelSlice";
import { getChannelData } from "../../features/channel/channelThunks";
import extractPath from "../../utils/extractPath";

export const useChannel = () => {
  const dispatch = useAppDispatch();

  const data = useSelector(selectChannelData);
  const searchAndLoardError = useSelector(selectChannelSearchAndLoadError);
  const searchAndLoadstatus = useSelector(selectChannelSearchAndLoadStatus);
  const channelId = useSelector(selectChannelId);
  const URL = useSelector(selectChannelURL);

  return {
    state: {
      data,
      searchAndLoardError,
      searchAndLoadstatus,
      channelId,
      URL,
      query: extractPath(URL)?.path,
    },
    actions: {
      updateUrl: (url: string) => dispatch(setURL(url)),
      fetchChannel: (url: string) => dispatch(getChannelData(extractPath(url))),
      clearChannelState: () => dispatch(clearChannelStates()),
    },
  };
};
