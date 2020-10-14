// Libs
import React, { useRef, useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import {
  Container,
  Grid,
  makeStyles,
  createStyles,
  Theme,
  Typography,
  CircularProgress,
  IconButton,
} from "@material-ui/core";
import { Replay } from "@material-ui/icons";

// Data
import { AppDispatchType } from "../../app/store";
import {
  getNotesThunk,
  openDialog,
  editNote,
  INote,
} from "../notes/notes.slice";

// Components
import Header from "../header";
import Sidebar from "./Sidebar";
import DashboardContent from "./DashboardContent";
import SpeedDials, { IOnActionClick } from "./SpeedDials";
import RootContainer from "../../components/container/RootContainer";
import ScrollableGridItem from "../../components/grid/ScrollableGridItem";

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
  const dispatch = useDispatch<AppDispatchType>();

  // get wrapper height for child to enable scroll
  const [height, setheight] = useState(0);
  useEffect(() => {
    setheight(contentParentRef.current?.clientHeight!);
  }, [contentParentRef]);

  // For re-fetch notes
  const [getNotesLoading, setGetNotesLoading] = useState(false);
  const getNotes = useCallback(() => {
    setGetNotesLoading(true);
    dispatch(getNotesThunk()).finally(() => {
      setGetNotesLoading(false);
    });
  }, [dispatch]);
  useEffect(() => {
    getNotes();
  }, [getNotes]);

  // Action for edit
  const handleEdit = (note: INote) => {
    dispatch(editNote(note));
  };

  // Action for speed dials
  const handleAction: IOnActionClick = (action) => {
    switch (action) {
      case "create":
        return dispatch(openDialog());
      default:
        return console.log("default");
    }
  };

  console.log("dashboard rerender");
  return (
    <RootContainer>
      <Header>
        <Grid container justify="space-between" alignItems="center">
          <Typography variant="h6">NOTEZ</Typography>
          <IconButton
            disabled={getNotesLoading}
            size="small"
            onClick={() => getNotes()}
          >
            {getNotesLoading ? (
              <CircularProgress size={24} />
            ) : (
              <Replay style={{ fontSize: 24 }} />
            )}
          </IconButton>
        </Grid>
      </Header>
      <Container className={classes.container}>
        <Grid
          container
          style={{ height: "100%", overflow: "hidden" }}
          innerRef={contentParentRef}
        >
          <ScrollableGridItem maxHeight={height} xs={3}>
            <Sidebar />
          </ScrollableGridItem>
          <ScrollableGridItem maxHeight={height} xs={9}>
            <DashboardContent onEdit={handleEdit} />
          </ScrollableGridItem>
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
