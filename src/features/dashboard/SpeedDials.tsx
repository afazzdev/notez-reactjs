import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import { Delete as DeleteIcon, Create as CreateIcon } from "@material-ui/icons";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      transform: "translateZ(0px)",
      flexGrow: 1,
    },
    exampleWrapper: {
      position: "relative",
      marginTop: theme.spacing(3),
      height: 380,
    },
    radioGroup: {
      margin: theme.spacing(1, 0),
    },
    speedDial: {
      position: "absolute",
      "&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft": {
        bottom: theme.spacing(2),
        right: theme.spacing(2),
      },
      "&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight": {
        top: theme.spacing(2),
        left: theme.spacing(2),
      },
    },
  }),
);

const actions = [
  { icon: <CreateIcon />, name: "Create" },
  { icon: <DeleteIcon />, name: "Delete" },
];

export type IAction = "create" | "delete";
export type IOnActionClick = (action: IAction) => void;

type ISpeedDials = {
  onActionClick: IOnActionClick;
};

export default function SpeedDials({ onActionClick }: ISpeedDials) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleSpeedDialAction = (action: IAction) => {
    handleClose();
    onActionClick(action);
  };

  return (
    <SpeedDial
      ariaLabel="SpeedDial dashboard"
      className={classes.speedDial}
      icon={<SpeedDialIcon />}
      onClose={handleClose}
      onOpen={handleOpen}
      open={open}
      direction={"up"}
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          onClick={() =>
            handleSpeedDialAction(action.name.toLowerCase() as IAction)
          }
        />
      ))}
    </SpeedDial>
  );
}
