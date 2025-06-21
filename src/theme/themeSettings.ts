import {
  createTheme,
  type PaletteMode,
  type ThemeOptions,
} from "@mui/material";
import { useMemo } from "react";

import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Theme {
    drawerWidth: number;
  }
  interface ThemeOptions {
    drawerWidth?: number;
  }
}

const drawerWidth = 240;

export const token = (mode: string) => ({
  ...(mode === "dark"
    ? {
        primary: {
          100: "#fffbd3",
          200: "#fff7b6",
          300: "#fff29c",
          400: "#fded88",
          500: "#fae879",
          600: "#fee07b",
          700: "#ffd67d",
          800: "#fcc175",
          900: "#ef9f66",
        },
        background: {
          default: "#202226",
          paper: "#242830",
        },
        text: {
          primary: "#e9eaee",
          secondary: "#999aa0",
        },
      }
    : {
        primary: {
          100: "#c4c9ef",
          200: "#9da7e5",
          300: "#7484da",
          400: "#5368d2",
          500: "#2f4dca",
          600: "#2945bf",
          700: "#1d3bb3",
          800: "#1030a7",
          900: "#001c94",
        },
        background: {
          default: "#f3f5f7",
          paper: "#ffffff",
        },
        text: {
          primary: "#2a2c2e",
          secondary: "#999aa0",
        },
      }),
});

export const themeSettings = (mode: PaletteMode): ThemeOptions => {
  const color = token(mode);
  return {
    drawerWidth: drawerWidth,
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            primary: {
              main: color.primary[500],
              light: color.primary[200],
              dark: color.primary[800],
              contrastText: "#c5c8d0",
            },
            background: {
              default: color.background.default,
              paper: color.background.paper,
            },
            text: {
              primary: color.text.primary,
              secondary: color.text.secondary,
            },
          }
        : {
            primary: {
              main: color.primary[500],
              light: color.primary[200],
              dark: color.primary[800],
              contrastText: "#c5c8d0",
            },
            background: {
              default: color.background.default,
              paper: color.background.paper,
            },
            text: {
              primary: color.text.primary,
              secondary: color.text.secondary,
            },
          }),
    },
    components: {
      MuiListItemIcon: {
        styleOverrides: {
          root: {
            color: "#999aa0",
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            color: "#999aa0",
            "&:hover": {
              backgroundColor: "#eaebf2",
            },
          },
        },
      },
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
  };
};

export const useMode = () => {
  const mode = "dark";
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return [theme];
};
