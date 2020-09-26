import React, { useState } from "react";
import {
  Grid,
  Avatar,
  Badge,
  IconButton,
  Typography,
  Fade,
} from "@material-ui/core";
import Edit from "@material-ui/icons/Edit";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/root.reducer";
import { logOut } from "../auth/auth.slice";
import { AppDispatchType } from "../../app/store";

function LeftSide() {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatchType>();
  const [hover, setHover] = useState(false);
  const [hoverPic, setHoverPic] = useState(false);
  const history = useHistory();
  const location = useLocation();

  return (
    <Grid
      container
      style={{ height: "100vh" }}
      alignItems="center"
      justify="center"
    >
      <Grid
        item
        style={{
          textAlign: "center",
        }}
      >
        <Badge
          overlap="circle"
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          badgeContent={
            <Fade in={hoverPic}>
              <IconButton
                style={{
                  background: "white",
                  border: "1px solid grey",
                }}
              >
                <Edit />
              </IconButton>
            </Fade>
          }
          onMouseEnter={() => setHoverPic(true)}
          onMouseLeave={() => setHoverPic(false)}
        >
          <Avatar
            style={{
              height: 200,
              width: 200,
              margin: "auto",
            }}
          >
            {user.photo}
          </Avatar>
        </Badge>
        <div
          style={{
            height: 60,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <Typography
            variant="h6"
            style={{ margin: "1rem 0" }}
            onClick={() => history.push(`/@${user.username}`)}
          >
            {user.username}
          </Typography>
          {location.pathname === `/@${user.username}` && (
            <Fade in={hover}>
              <IconButton
                style={{
                  marginLeft: "1rem",
                  position: "absolute",
                  right: -16,
                }}
                onClick={() => {
                  history.push(`/@${user.username}/setting`);
                }}
                title="Edit"
              >
                <Edit />
              </IconButton>
            </Fade>
          )}
          {location.pathname === `/@${user.username}/setting` && (
            <IconButton
              style={{
                marginLeft: "1rem",
                position: "absolute",
                right: -16,
              }}
              title="Dashboard"
              onClick={() => {
                history.push(`/@${user.username}`);
              }}
            >
              <DashboardIcon />
            </IconButton>
          )}
        </div>
        <IconButton
          title="Log out"
          onClick={() => {
            dispatch(logOut(history));
          }}
        >
          <ExitToAppIcon color="secondary" />
        </IconButton>
      </Grid>
    </Grid>
  );
}

export default LeftSide;
