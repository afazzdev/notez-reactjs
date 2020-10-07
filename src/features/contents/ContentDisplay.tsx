import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { useDispatch } from "react-redux";
import { editNote } from "../notes/notes.slice";

const useStyles = makeStyles({
  root: {
    width: "100%",
    margin: "0 1rem 1rem 0",
    display: "inline-block",
  },
  body: {
    overflow: "hidden",
    WebkitLineClamp: 20,
    WebkitBoxOrient: "vertical",
    display: "-webkit-box",
  },
});

export interface IContentDisplayProps {
  image?: string;
  title?: string;
  body?: string;
}

export default function ContentDisplay(props: IContentDisplayProps) {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <Card className={classes.root}>
      <CardActionArea
        onClick={() => {
          console.log(props);
          dispatch(editNote(props));
        }}
      >
        {props.image && (
          <CardMedia
            component="img"
            alt={props.title}
            height="140"
            image={props.image}
            title={props.title}
          />
        )}
        <CardContent>
          {props.title && (
            <Typography gutterBottom variant="h5" component="h2">
              {props.title}
            </Typography>
          )}
          {props.body && (
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              className={classes.body}
            >
              {props.body}
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
