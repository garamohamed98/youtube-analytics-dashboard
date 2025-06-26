import { ThemeProvider } from "@emotion/react";
import { useMode } from "./themeSettings";
import type { ReactNode } from "react";
import { CssBaseline } from "@mui/material";

const ThemeWrapper = ({ children }: { children: ReactNode }) => {
  const [theme] = useMode();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default ThemeWrapper;
