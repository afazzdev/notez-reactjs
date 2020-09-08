import React, { useState } from "react";
import { Fab, Grid, TextField } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../app/root.reducer";
import { editUser } from "../auth/auth.slice";

function Setting() {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const [state, setState] = useState(
    Object.assign(
      {
        username: "",
        password: "******",
      },
      user
    )
  );

  const handleSubmit = () => {
    dispatch(editUser(state));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setState({ ...state, [e.currentTarget.name]: e.currentTarget.value });
  };

  return (
    <Grid container justify='center'>
      <Grid
        item
        style={{
          width: 300,
          position: "relative",
          backgroundColor: "#fff",
          padding: "1rem",
          borderRadius: 10,
          border: "2px solid #f6f6f6",
        }}
      >
        <TextField
          label='Username'
          value={state.username}
          name='username'
          onChange={handleChange}
          fullWidth
          variant='outlined'
        />
        <TextField
          label='Password'
          type='password'
          value={state.password}
          name='password'
          onChange={handleChange}
          fullWidth
          variant='outlined'
          style={{ marginTop: "1rem" }}
          onFocus={() => setState({ ...state, password: "" })}
          onBlur={() => setState({ ...state, password: "******" })}
        />
        <Fab
          color='primary'
          style={{
            float: "right",
            marginTop: "2rem",
          }}
          onClick={handleSubmit}
        >
          <SaveIcon />
        </Fab>
      </Grid>
    </Grid>
  );
}

export default Setting;
