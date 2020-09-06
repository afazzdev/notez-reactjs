import React from "react";
import { Container, Grid } from "@material-ui/core";
import { TabContext, TabList, TabPanel } from "@material-ui/lab";

import { useTabsWithRouter } from "../../hooks/useTabsWithRouter";
import { TabLink } from "../../components/tabs";

export interface IAuthRoute {
  routes: { path: string; label: string }[];
  defaultRoute: string;
}

function Home({
  children,
  routes,
  defaultRoute,
}: { children: React.ReactNode } & IAuthRoute) {
  const tabValue = useTabsWithRouter(
    [...routes.map((el) => el.path)],
    defaultRoute
  );

  return (
    <Container>
      <Grid
        container
        justify='center'
        alignItems='center'
        style={{ height: "100vh" }}
      >
        <Grid item>
          <TabContext value={tabValue}>
            <TabList aria-label='auth' centered>
              {routes.map((el) => (
                <TabLink
                  key={el.path + el.label}
                  value={el.path}
                  label={el.label}
                />
              ))}
            </TabList>
            {React.Children.map(children, (child) => {
              if (!React.isValidElement(child)) return;
              const { path } = child.props;
              return <TabPanel value={path}>{child}</TabPanel>;
            })}
          </TabContext>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Home;
