import React, { useState } from "react";
import {
  TextField,
  createStyles,
  makeStyles,
  Theme,
  Button,
} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 300,
      margin: "auto",
      "& > *": {
        margin: "1rem auto",
      },
    },
  })
);

function Auth({ componentFor }: { componentFor: string }) {
  const classes = useStyles();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <form
      className={classes.root}
      onSubmit={(e) => {
        e.preventDefault();
        console.log({ username, password });
      }}
    >
      <TextField
        label='Username'
        fullWidth
        value={username}
        color='secondary'
        onChange={(e) => setUsername(e.currentTarget.value)}
      />
      <TextField
        label='Password'
        fullWidth
        value={password}
        color='secondary'
        onChange={(e) => setPassword(e.currentTarget.value)}
      />
      <Button type='submit' fullWidth variant='contained' color='secondary'>
        {componentFor}
      </Button>
    </form>
  );
}

export default Auth;
