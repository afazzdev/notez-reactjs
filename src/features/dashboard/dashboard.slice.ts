import { createSlice } from "@reduxjs/toolkit";
import { Column } from "material-table";

interface Row {
  name: string;
  surname: string;
  birthYear: number;
  birthCity: number;
}

interface TableState {
  columns: Array<Column<Row>>;
  data: Row[];
}

const initialState: { tableData: TableState } = {
  tableData: {
    columns: [
      { title: "Name", field: "name" },
      { title: "Surname", field: "surname" },
      { title: "Birth Year", field: "birthYear", type: "numeric" },
      {
        title: "Birth Place",
        field: "birthCity",
        lookup: { 34: "İstanbul", 63: "Şanlıurfa" },
      },
    ],
    data: [
      { name: "Mehmet", surname: "Baran", birthYear: 1987, birthCity: 63 },
      {
        name: "Zerya Betül",
        surname: "Baran",
        birthYear: 2017,
        birthCity: 34,
      },
    ],
  },
};

const dashboard = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    init: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const { init } = dashboard.actions;

export default dashboard.reducer;
