import React from "react";
import { CircularProgress } from "@material-ui/core";

function FullLoading() {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "grid",
        placeItems: "center",
        position: "fixed",
      }}
    >
      <CircularProgress size={50} />
    </div>
  );
}

export default FullLoading;
