import {
  Box,
  Button,
  Divider,
  Switch,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { useState } from "react";

const TabPanel = ({
  value,
  index,
  children,
}: {
  value: number;
  index: number;
  children: React.ReactNode;
}) => {
  return (
    <Box hidden={value !== index} width="100%" my="20px">
      {children}
    </Box>
  );
};

const Settings = () => {
  const [showedTab, setShawedTab] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setShawedTab(newValue);
  };

  return (
    <Grid container spacing={4}>
      <Grid size={{ xs: 12, md: 12 }}>
        <Tabs value={showedTab} onChange={handleChange}>
          <Tab label="Configuration" />
          <Tab label="Profile" disabled />
        </Tabs>
      </Grid>
      <TabPanel value={showedTab} index={0}>
        <Grid container spacing={2} alignItems="center">
          <Grid size={{ xs: 12, md: 5 }}>
            <Box display="flex" flexDirection="column" gap="10px">
              <Typography variant="h2">YouTube Channel URL</Typography>
              <Typography variant="h3" color="text.secondary">
                Enter the full URL of the YouTube channel you want to analyze.
                This will be used to display channel analyses on your dashboard.
              </Typography>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 5 }}>
            <TextField
              label="Youtube URL"
              variant="outlined"
              sx={{ width: "100%" }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 1 }}>
            <Button variant="contained">Change</Button>
          </Grid>
          <Grid size={{ xs: 12, md: 11 }}>
            <Divider sx={{ p: "10px" }} />
          </Grid>
          <Grid size={{ xs: 12, md: 10 }}>
            <Box display="flex" flexDirection="column" gap="10px">
              <Typography variant="h2">Switch Theme Mode</Typography>
              <Typography variant="h3" color="text.secondary">
                Toggle between Light and Dark modes to customize the appearance
                of the app according to your preference. Your choice will be
                saved and applied across the application.
              </Typography>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 1 }}>
            <Switch />
          </Grid>
        </Grid>
      </TabPanel>
    </Grid>
  );
};

export default Settings;
