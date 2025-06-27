import { Tab, Tabs } from "@mui/material";
import Grid from "@mui/material/Grid";

const SettingsTab = ({
  showedTab,
  handleChangeTab,
  children,
}: {
  children: React.ReactElement;
  showedTab: number;
  handleChangeTab: (newValue: number) => void;
}) => {
  const onChange = (_: React.SyntheticEvent, newValue: number) => {
    handleChangeTab(newValue);
  };
  return (
    <Grid container spacing={4}>
      <Grid size={{ xs: 12, md: 12 }}>
        <Tabs value={showedTab} onChange={onChange}>
          <Tab label="Configuration" />
          <Tab label="Profile" disabled />
        </Tabs>
      </Grid>
      {children}
    </Grid>
  );
};

export default SettingsTab;
