import {
  Box,
  Divider,
  Switch,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { useState } from "react";
import SettingsTab from "../../components/ui/Settings/SettingsTab";
import TabPanel from "../../components/ui/Settings/TabPanel";
import ChannelURLForm from "../../components/ui/Settings/ChannelURLForm";



const Settings = () => {
  const [showedTab, setShawedTab] = useState(0);

  const handleChangeTab = (newValue: number) => {
    setShawedTab(newValue);
  };

  return (
    <SettingsTab showedTab={showedTab} handleChangeTab={handleChangeTab}>
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
          <ChannelURLForm />
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
    </SettingsTab>
  );
};

export default Settings;
