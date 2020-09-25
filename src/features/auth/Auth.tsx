import React, { useState } from "react";
import { RouteChildrenProps } from "react-router-dom";
import {
  TextField,
  createStyles,
  makeStyles,
  Theme,
  Button,
  CircularProgress,
  FormHelperText,
} from "@material-ui/core";
import * as authActionAsync from "./auth.slice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/root.reducer";
import { AppDispatchType } from "../../app/store";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 300,
      margin: "auto",
      "& > *": {
        margin: "1rem auto",
      },
    },
  }),
);

type IComponentFor = "signIn" | "signUp";

function Auth({
  componentFor,
  history,
}: { componentFor: IComponentFor } & RouteChildrenProps) {
  const classes = useStyles();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { isLoading, message } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatchType>();

  const handleSubmit = async () => {
    await dispatch(
      authActionAsync[componentFor]({
        password,
        username,
      }),
    ).then(() => {
      history.push("/dashboard");
    });
  };

  return (
    <form
      className={classes.root}
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <TextField
        label="Username"
        type="text"
        fullWidth
        value={username}
        color="secondary"
        error={username.length <= 8 && username.length > 0}
        helperText={
          username.length <= 8 && username.length > 0 && "Minimal 8 karakter"
        }
        onChange={(e) => setUsername(e.currentTarget.value)}
      />
      <TextField
        label="Password"
        type="password"
        fullWidth
        value={password}
        color="secondary"
        error={password.length <= 8 && password.length > 0}
        helperText={
          password.length <= 8 && password.length > 0 && "Minimal 8 karakter"
        }
        onChange={(e) => setPassword(e.currentTarget.value)}
      />
      {message && <FormHelperText error={!!message}>{message}</FormHelperText>}
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="secondary"
        disabled={isLoading || username.length <= 8 || password.length < 8}
      >
        {isLoading ? <CircularProgress size={20} /> : componentFor}
      </Button>
    </form>
  );
}

export default Auth;
