import React from "react";
import { createMuiTheme, ThemeProvider, CssBaseline } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    secondary: {
      main: "#5068a9",
      dark: "#86a6df",
      light: "#324e7b",
      contrastText: "#f8f8f8",
    },
    type: "dark",
  },
});

const MuiProvider = ({ children }: { children: React.ReactNode }) => {
  if (process.env.NODE_ENV !== "production") {
    console.log(theme);
    theme.unstable_strictMode = true;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default MuiProvider;
