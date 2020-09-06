import React from "react";
import { LinkProps } from "react-router-dom";
import { Tab } from "@material-ui/core";
import { TabProps } from "@material-ui/core/Tab";
import RouterLink from "./RouterLink";

const TabLink: React.FC<
  Omit<LinkProps, "to"> & TabProps & { to?: LinkProps["to"] }
> = ({ to, value, ...props }) => {
  return (
    <Tab component={RouterLink} to={to ?? value} value={value} {...props} />
  );
};

export default TabLink;
