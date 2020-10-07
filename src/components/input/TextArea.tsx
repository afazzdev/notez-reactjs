import React from "react";
import { TextareaAutosize, TextareaAutosizeProps } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      fontFamily: theme.typography.fontFamily,
      fontSize: "1.1rem",
      width: "100%",
      background: "inherit",
      color: theme.palette.primary.contrastText,
      border: "none",
      outline: "none",
      resize: "none",
    },
  }),
);

export default function TextArea(props: TextareaAutosizeProps) {
  const classes = useStyles();
  return <TextareaAutosize className={classes.root} {...props} />;
}
