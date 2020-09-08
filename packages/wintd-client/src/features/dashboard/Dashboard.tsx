import React, { Suspense } from "react";
import { Container, Grid, CircularProgress } from "@material-ui/core";
import { Switch, Route } from "react-router-dom";
import LeftSide from "./LeftSide";

const MaterialTableDemo = React.lazy(
  () => import("../../components/tables/MaterialTable")
);
const Setting = React.lazy(() => import("../settings/Setting"));

function Dashboard() {
  return (
    <Container>
      <Grid
        container
        alignItems='center'
        style={{
          height: "100vh",
        }}
      >
        <Grid item xs={4}>
          <LeftSide />
        </Grid>
        <Grid item xs={8}>
          <Suspense
            fallback={
              <div style={{ textAlign: "center" }}>
                <CircularProgress size={80} />
              </div>
            }
          >
            <Switch>
              <Route path='/dashboard/setting' component={Setting} />
              <Route path='/dashboard' component={MaterialTableDemo} />
            </Switch>
          </Suspense>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Dashboard;
