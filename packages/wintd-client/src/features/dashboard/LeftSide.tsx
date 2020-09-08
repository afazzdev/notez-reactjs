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
import { useHistory, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../app/root.reducer";

function LeftSide() {
  const user = useSelector((state: RootState) => state.auth.user);
  const [hover, setHover] = useState(false);
  const [hoverPic, setHoverPic] = useState(false);
  const history = useHistory();
  const location = useLocation();

  return (
    <Grid
      container
      style={{ height: "100vh" }}
      alignItems='center'
      justify='center'
    >
      <Grid
        item
        style={{
          textAlign: "center",
        }}
      >
        <Badge
          overlap='circle'
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
            variant='h6'
            style={{ margin: "1rem 0" }}
            onClick={() => history.push("/dashboard")}
          >
            {user.username}
          </Typography>
          {location.pathname === "/dashboard" && (
            <Fade in={hover}>
              <IconButton
                style={{
                  marginLeft: "1rem",
                  position: "absolute",
                  right: -16,
                }}
                onClick={() => {
                  history.push("/dashboard/setting");
                }}
              >
                <Edit />
              </IconButton>
            </Fade>
          )}
          {location.pathname === "/dashboard/setting" && (
            <IconButton
              style={{
                marginLeft: "1rem",
                position: "absolute",
                right: -16,
              }}
              onClick={() => {
                history.push("/dashboard");
              }}
            >
              <DashboardIcon />
            </IconButton>
          )}
        </div>
      </Grid>
    </Grid>
  );
}

export default LeftSide;
