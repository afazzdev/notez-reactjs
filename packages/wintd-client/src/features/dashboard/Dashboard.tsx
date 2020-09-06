import React from "react";
import { Container, Grid } from "@material-ui/core";
import Table, {
  rowsTest,
  headCellsTest,
} from "../../components/tables/EnhancedTable";

function Dashboard() {
  return (
    <Container>
      <Grid container>
        <Grid item xs={4}>
          left side
        </Grid>
        <Grid item xs={8}>
          <Table headCells={headCellsTest} rows={rowsTest} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Dashboard;
