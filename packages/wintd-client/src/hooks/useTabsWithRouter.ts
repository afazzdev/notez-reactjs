import { useRouteMatch } from "react-router-dom";

export const useTabsWithRouter = (
  routes: string | string[],
  defaultRoute: string
): string => {
  const match = useRouteMatch(routes);

  return match?.path ?? defaultRoute;
};
