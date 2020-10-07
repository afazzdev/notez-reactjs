import React, { useRef, useEffect, useState } from "react";
import {
  Container,
  Grid,
  makeStyles,
  createStyles,
  Theme,
} from "@material-ui/core";
import Sidebar from "./Sidebar";
import RootContainer from "../../components/container/RootContainer";
import Header from "../header";
import { DashboardContent } from "../contents";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      overflow: "hidden",
    },
  }),
);

function Dashboard() {
  const contentParentRef = useRef<any | null>(null);
  const [height, setheight] = useState(0);

  useEffect(() => {
    if (!!contentParentRef) {
      setheight(contentParentRef.current?.clientHeight!);
    }
  }, [contentParentRef]);

  const classes = useStyles();

  return (
    <RootContainer>
      <Header />
      <Container className={classes.container}>
        <Grid
          container
          style={{ height: "100%", overflow: "hidden" }}
          innerRef={contentParentRef}
        >
          <Grid
            item
            xs={3}
            style={{
              overflow: "hidden",
              height: "100%",
            }}
          >
            <Sidebar maxHeight={height} />
          </Grid>
          <Grid item xs={9} style={{ overflow: "hidden" }}>
            <DashboardContent maxHeight={height} />
          </Grid>
        </Grid>
      </Container>
    </RootContainer>
  );
}

export default Dashboard;
