import React, { useRef, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  Container,
  Grid,
  makeStyles,
  createStyles,
  Theme,
} from "@material-ui/core";

import Sidebar from "./Sidebar";
import DashboardContent from "./DashboardContent";
import SpeedDials, { IOnActionClick } from "./SpeedDials";

import RootContainer from "../../components/container/RootContainer";

import Header from "../header";
import { openDialog } from "../notes/notes.slice";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      overflow: "hidden",
      position: "relative",
    },
  }),
);

function Dashboard() {
  const classes = useStyles();
  const contentParentRef = useRef<any | null>(null);
  const dispatch = useDispatch();

  // get wrapper height for child to enable scroll
  const [height, setheight] = useState(0);
  useEffect(() => {
    setheight(contentParentRef.current?.clientHeight!);
  }, [contentParentRef]);

  const handleAction: IOnActionClick = (action) => {
    switch (action) {
      case "create":
        return dispatch(openDialog());
      default:
        return console.log("default");
    }
  };

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
          <div
            style={{
              position: "absolute",
              bottom: "2rem",
              right: "2rem",
            }}
          >
            <SpeedDials onActionClick={handleAction} />
          </div>
        </Grid>
      </Container>
    </RootContainer>
  );
}

export default Dashboard;
