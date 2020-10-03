import React, { useState } from "react";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  List,
  CircularProgress,
  IconButton,
} from "@material-ui/core";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import {
  ExpandLess,
  ExpandMore,
  SvgIconComponent,
  Replay,
} from "@material-ui/icons";
import clsx from "clsx";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    nested: {
      paddingLeft: theme.spacing(4),
    },
  }),
);

type TOnClick1 = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
type TOnClick2 = (
  event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  label: string,
) => void;

interface IBaseListButton {
  icon: SvgIconComponent;
  label: string;
  selected?: boolean;
  child?: boolean;
  onClick?: TOnClick1;
}

export type IListButtonData = Pick<IBaseListButton, "icon" | "label">[];

interface IListButtonArray extends Omit<IBaseListButton, "onClick"> {
  loading?: boolean;
  data?: IListButtonData;
  error?: boolean;
  onError?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  onClick: TOnClick2;
}

type IListButton = IBaseListButton | IListButtonArray;

function ListButton(props: IListButton) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const { icon, label, child, onClick, selected } = props;

  if ("data" in props && Array.isArray(props.data)) {
    const { data, loading, error, onError } = props;
    const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      setOpen(!open);
      onClick!(e, label);
    };

    return (
      <>
        <ListItem button onClick={handleClick} disableRipple>
          <ListItemIcon>{React.createElement(icon)}</ListItemIcon>
          <ListItemText primary={label} />
          {error ? (
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                if (onError) {
                  onError(e as any);
                }
              }}
              style={{
                padding: 4,
              }}
            >
              <Replay />
            </IconButton>
          ) : loading ? (
            <CircularProgress size={24} />
          ) : open ? (
            <ExpandLess />
          ) : (
            <ExpandMore />
          )}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {data.map((datum) =>
              React.createElement(ListButton, {
                ...datum,
                child: true,
                key: datum.label,
                onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
                  onClick!(e, datum.label),
              }),
            )}
          </List>
        </Collapse>
      </>
    );
  }

  return (
    <ListItem
      button
      disableRipple
      onClick={onClick as TOnClick1}
      className={clsx({ [classes.nested]: child })}
      selected={selected}
    >
      <ListItemIcon>{React.createElement(icon)}</ListItemIcon>
      <ListItemText primary={label} />
    </ListItem>
  );
}

export default ListButton;
