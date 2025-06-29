import { Switch } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useTheme } from "../../../hooks/theme/useTheme";

const ThemeModeForm = () => {
  const {
    state: { mode },
    actions: { changeMode },
  } = useTheme();
  return (
    <Grid size={{ xs: 12, md: 1 }}>
      <Switch
        value={mode}
        onChange={() => {
          changeMode();
        }}
      />
    </Grid>
  );
};

export default ThemeModeForm;
