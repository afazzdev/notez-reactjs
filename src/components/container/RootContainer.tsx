import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(
  createStyles({
    root: {
      height: "100vh",
      display: "grid",
      gridAutoRows: "auto 1fr",
    },
  }),
);

function RootContainer({ children }: { children: React.ReactNode }) {
  const classes = useStyles();
  return <div className={classes.root}>{children}</div>;
}

export default RootContainer;
