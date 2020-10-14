import React from "react";
import { Container, AppBar, Toolbar } from "@material-ui/core";

function Header({ children }: { children: React.ReactChild }) {
  return (
    <AppBar position="static" color="inherit" elevation={0}>
      <Toolbar>
        <Container>{children}</Container>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
