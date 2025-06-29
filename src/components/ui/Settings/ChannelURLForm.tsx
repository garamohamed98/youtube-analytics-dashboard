import Grid from "@mui/material/Grid";
import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useChannel } from "../../../hooks/channel/useChannel";

const YOUTUBE_CHANNEL_URL_REGEX =
  /^(https?:\/\/)?(www\.)?youtube\.com\/(c\/[\w\-\.]+|channel\/UC[\w\-]{22}|user\/[\w\-\.]+|@[\w\-\.]+)(\/.*)?$/i;

const ChannelURLForm = () => {
  const {
    state: { searchAndLoadstatus, searchAndLoardError, channelId, URL },
    actions: { updateUrl, fetchChannel, clearChannelState },
  } = useChannel();
  const [url, setUrl] = useState(URL);
  const [isValid, setValid] = useState(false);
  const [URLError, setURLError] = useState(false);

  const getHelperText = () => {
    if (!url) return "Enter youtube channel URL";
    if (URLError) return "Invalid Youtube channel URL";
    if (searchAndLoadstatus === "loading") return "loading...";
    if (searchAndLoadstatus === "failed") return searchAndLoardError;
    if (searchAndLoadstatus === "succeeded" && channelId)
      return `Channel ID: ${channelId}`;
    if (searchAndLoadstatus === "idle") return `Enter youtube channel URL`;
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (url) {
        setValid(YOUTUBE_CHANNEL_URL_REGEX.test(url.trim()));
        setURLError(!YOUTUBE_CHANNEL_URL_REGEX.test(url.trim()) && url !== "");
      } else {
        setValid(false);
        setURLError(false);
      }
    }, 500);
    return () => clearTimeout(timeout);
  }, [url]);

  const onClick = () => {
    if (url && YOUTUBE_CHANNEL_URL_REGEX.test(url.trim()) && url !== "") {
      clearChannelState();
      updateUrl(url);
      fetchChannel(url);
    }
  };

  return (
    <>
      <Grid size={{ xs: 12, md: 5 }}>
        <TextField
          label="Youtube URL"
          variant="outlined"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          error={URLError}
          sx={{ width: "100%" }}
          helperText={getHelperText()}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 1 }}>
        <Button variant="contained" disabled={!isValid} onClick={onClick}>
          Change
        </Button>
      </Grid>
    </>
  );
};

export default ChannelURLForm;
