import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Tag from "../../components/tag/Tag";
import clsx from "clsx";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: ({ favorite }: { favorite: boolean }) => ({
      width: "100%",
      margin: "0 1rem 1rem 0",
      display: "inline-block",
      position: "relative",
    }),
    title: {
      overflow: "hidden",
      WebkitLineClamp: 2,
      WebkitBoxOrient: "vertical",
      display: "-webkit-box",
      whiteSpace: "break-spaces",
      wordWrap: "break-word",
    },
    content: {
      overflow: "hidden",
      WebkitLineClamp: 20,
      WebkitBoxOrient: "vertical",
      display: "-webkit-box",
      whiteSpace: "break-spaces",
      wordWrap: "break-word",
    },
    favorite: {
      "&::after": {
        content: `""`,
        height: 30,
        width: 30,
        backgroundColor: theme.palette.secondary.main,
        position: "absolute",
        top: 0,
        right: 0,
        clipPath: "polygon(100% 0, 100% 50%, 50% 100%, 0 50%, 0 0)",
        transform: "translate(-10px, -5px)",
      },
    },
  }),
);

export interface IContentDisplayProps {
  image?: string;
  title?: string;
  content?: string;
  tags?: any[];
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  favorite?: boolean;
}

export default function ContentDisplay({
  image,
  title,
  content,
  tags,
  onClick,
  favorite,
}: IContentDisplayProps) {
  const classes = useStyles({ favorite: favorite! });

  return (
    <Card className={clsx(classes.root, { [classes.favorite]: favorite })}>
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
          {content && (
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              className={classes.content}
            >
              {content}
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
