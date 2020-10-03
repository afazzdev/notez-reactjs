import React from "react";
import {
  Container,
  Grid,
  AppBar,
  Toolbar,
  Typography,
  makeStyles,
  createStyles,
  Theme,
} from "@material-ui/core";
import Sidebar from "./Sidebar";
import RootContainer from "../../components/container/RootContainer";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginTop: "1rem",
    },
  }),
);

function Dashboard() {
  const classes = useStyles();

  return (
    <RootContainer>
      <AppBar position="static" color="inherit" elevation={0}>
        <Toolbar>
          <Container>
            <Typography variant="h6">NOTEZ</Typography>
          </Container>
        </Toolbar>
      </AppBar>
      <Container className={classes.container}>
        <Grid container>
          <Grid item xs={3}>
            <Sidebar />
          </Grid>
          <Grid item xs={9}>
            Content
          </Grid>
        </Grid>
      </Container>
    </RootContainer>
  );
}

export default Dashboard;
