import React from "react";
import { TextField, TextFieldProps } from "@material-ui/core";
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
    underline: {
      "&&&:before": {
        borderBottom: "none",
      },
      "&&:after": {
        borderBottom: "none",
      },
    },
  }),
);

export default function TextArea(props: TextFieldProps) {
  const classes = useStyles();
  return (
    <TextField
      multiline
      className={classes.root}
      rows={props.rows ?? 8}
      InputProps={{
        classes: {
          underline: classes.underline,
        },
      }}
      {...props}
    />
  );
}
