import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Tag from "../../components/tag/Tag";

const useStyles = makeStyles({
  root: {
    width: "100%",
    margin: "0 1rem 1rem 0",
    display: "inline-block",
  },
  title: {
    overflow: "hidden",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    display: "-webkit-box",
    whiteSpace: "break-spaces",
    wordWrap: "break-word",
  },
  body: {
    overflow: "hidden",
    WebkitLineClamp: 20,
    WebkitBoxOrient: "vertical",
    display: "-webkit-box",
    whiteSpace: "break-spaces",
    wordWrap: "break-word",
  },
});

export interface IContentDisplayProps {
  image?: string;
  title?: string;
  body?: string;
  tags?: any[];
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export default function ContentDisplay({
  image,
  title,
  body,
  tags,
  onClick,
}: IContentDisplayProps) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea onClick={onClick}>
        {image && (
          <CardMedia
            component="img"
            alt={title}
            height="140"
            image={image}
            title={title}
          />
        )}
        <CardContent>
          {title && (
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              className={classes.title}
            >
              {title}
            </Typography>
          )}
          {body && (
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              className={classes.body}
            >
              {body}
            </Typography>
          )}
          {tags && (
            <span
              style={{
                display: "inline-flex",
              }}
            >
              {tags.map((tag) => (
                <Tag label={tag.title} key={tag.title} />
              ))}
            </span>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
