import React from "react";
import { Container, Grid } from "@material-ui/core";
import MaterialTableDemo from "../../components/tables/MaterialTable";

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
          left side
        </Grid>
        <Grid item xs={8}>
          <MaterialTableDemo />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Dashboard;
