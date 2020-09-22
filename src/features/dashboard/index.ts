import Dashboard from "./Dashboard";
import * as DashboardSlice from "./dashboard.slice";

export const {
  default: dashboardReducer,
  ...dashboardActions
} = DashboardSlice;

export default Dashboard;
