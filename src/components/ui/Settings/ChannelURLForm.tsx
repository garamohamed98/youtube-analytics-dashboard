import Grid from "@mui/material/Grid";
import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";

const YOUTUBE_CHANNEL_URL_REGEX =
  /^(https?:\/\/)?(www\.)?youtube\.com\/(c\/[\w\-]+|channel\/UC[\w\-]{22}|user\/[\w\-]+|@[\w\-]+)(\/.*)?$/i;

const ChannelURLForm = () => {
  const [url, setUrl] = useState("");
  const [isValid, setValid] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setValid(YOUTUBE_CHANNEL_URL_REGEX.test(url.trim()));
      setError(!YOUTUBE_CHANNEL_URL_REGEX.test(url.trim()) && url !== "");
    }, 500);
    return () => clearTimeout(timeout);
  }, [url]);

  return (
    <>
      <Grid size={{ xs: 12, md: 5 }}>
        <TextField
          label="Youtube URL"
          variant="outlined"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          error={error}
          sx={{ width: "100%" }}
          helperText={error && "Invalid YouTube channel URL"}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 1 }}>
        <Button variant="contained" disabled={!isValid}>
          Change
        </Button>
      </Grid>
    </>
  );
};

export default ChannelURLForm;
