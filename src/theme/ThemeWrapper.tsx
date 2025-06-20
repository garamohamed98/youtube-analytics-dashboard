import { ThemeProvider } from "@emotion/react";
import { useMode } from "./themeSettings";
import type { ReactNode } from "react";

const ThemeWrapper = ({ children }: { children: ReactNode }) => {
  const [theme] = useMode();
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default ThemeWrapper;
