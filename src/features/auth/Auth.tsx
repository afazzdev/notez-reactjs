import React from "react";
import { RouteChildrenProps, Prompt } from "react-router-dom";
import {
  createStyles,
  makeStyles,
  Theme,
  Button,
  CircularProgress,
  FormHelperText,
} from "@material-ui/core";
import { TextField } from "formik-material-ui";
import { Field, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";

import * as authActionAsync from "./auth.slice";
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

const SubmitButton = React.memo(function ({
  buttonIsDisabled,
  componentFor,
}: {
  buttonIsDisabled: boolean;
  componentFor: string;
}) {
  const isLoading = useSelector((state: RootState) => state.auth.isLoading);

  console.log("Submit button re-rendered");
  return (
    <Button
      type="submit"
      fullWidth
      variant="contained"
      color="secondary"
      disabled={buttonIsDisabled || isLoading}
    >
      {isLoading ? <CircularProgress size={20} /> : componentFor}
    </Button>
  );
});

function Auth({
  componentFor,
  history,
}: { componentFor: IComponentFor } & RouteChildrenProps) {
  const classes = useStyles();
  const message = useSelector((state: RootState) => state.auth.message);
  const dispatch = useDispatch<AppDispatchType>();

  console.log("auth-render");
  return (
    <Formik
      initialValues={{
        username: "",
        password: "",
      }}
      onSubmit={(values, { setSubmitting }) => {
        dispatch(authActionAsync[componentFor](values))
          .then((res) => {
            console.log("success");
            history.push(`/@${res.data?.username}`);
          })
          .catch((err) => {
            console.log(`error: ${err}`);
            setSubmitting(false);
          });
      }}
      validate={(values) => {
        const errors: Partial<typeof values> = {};

        if (!/^((\w|\d){8,})$/.test(values.username)) {
          errors.username = "Username minimal 8 karakter";
        }
        if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(values.password)) {
          errors.password =
            "Password harus mengandung huruf, angka dan minimal 8 karakter";
        }

        return errors;
      }}
      validateOnChange
      initialTouched={{ username: false, password: false }}
    >
      {({
        isSubmitting,
        submitForm,
        isValid,
        touched,
        dirty,
        setFieldTouched,
        values,
      }) => (
        <Form
          className={classes.root}
          onSubmit={(e) => {
            e.preventDefault();
            submitForm();
          }}
        >
          <Prompt
            when={Object.values(values).some(Boolean)}
            message={(location) =>
              `Apakah anda ingin meninggalkan page ${location.pathname}?`
            }
          />
          <Field
            fullWidth
            component={TextField}
            type="text"
            label="Username"
            name="username"
            color="secondary"
            variant="outlined"
            onKeyUp={() => {
              if (!touched.username) {
                console.log("username field touched", touched.username);
                setFieldTouched("username", true);
              }
            }}
          />
          <Field
            fullWidth
            component={TextField}
            type="password"
            label="Password"
            name="password"
            color="secondary"
            variant="outlined"
            onKeyUp={() => {
              if (!touched.password) {
                console.log("password field touched", touched.password);
                setFieldTouched("password", true);
              }
            }}
          />

          {message && (
            <FormHelperText error={!!message}>{message}</FormHelperText>
          )}
          <SubmitButton
            buttonIsDisabled={
              !isValid ||
              isSubmitting ||
              !touched.username ||
              !touched.password ||
              !dirty
            }
            componentFor={componentFor}
          />
        </Form>
      )}
    </Formik>
  );
}

export default Auth;
