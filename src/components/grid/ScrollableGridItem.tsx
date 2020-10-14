import React from "react";
import { Grid, GridProps } from "@material-ui/core";

interface ScrollableGridItemProps
  extends Omit<GridProps, "item" | "container"> {
  maxHeight: number;
  children: React.ReactNode;
}

function ScrollableGridItem(props: ScrollableGridItemProps) {
  const { maxHeight, children, style, ...rest } = props;

  return (
    <Grid item style={{ overflow: "hidden", ...style }} {...rest}>
      <div
        style={{
          overflow: "auto",
          maxHeight,
        }}
      >
        {children}
      </div>
    </Grid>
  );
}

export default ScrollableGridItem;
