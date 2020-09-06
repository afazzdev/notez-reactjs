import React from "react";
import { Link, LinkProps } from "react-router-dom";

const RouterLink: React.FC<Omit<LinkProps, "innerRef" | "ref">> = (
  props,
  ref
) => <Link innerRef={ref} {...props} />;

// @ts-ignore
export default React.forwardRef(RouterLink);
