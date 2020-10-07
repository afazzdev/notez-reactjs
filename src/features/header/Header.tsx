import React from "react";
import {
  Container,
  AppBar,
  Toolbar,
  Typography,
  Grid,
  CircularProgress,
} from "@material-ui/core";

function Header() {
  return (
    <AppBar position="static" color="inherit" elevation={0}>
      <Toolbar>
        <Container>
          <Grid container justify="space-between" alignItems="center">
            <Typography variant="h6">NOTEZ</Typography>
            <CircularProgress size={24} />
          </Grid>
        </Container>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
