import React from "react";
import { createMuiTheme, ThemeProvider, CssBaseline } from "@material-ui/core";

const theme = createMuiTheme({});

const MuiProvider = ({ children }: { children: React.ReactNode }) => {
  if (process.env.NODE_ENV !== "production") {
    console.log(theme);
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default MuiProvider;
