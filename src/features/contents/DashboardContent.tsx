import React from "react";
import { Paper } from "@material-ui/core";

function DashboardContent({ maxHeight }: { maxHeight: number }) {
  return (
    <div
      style={{
        overflow: "auto",
        maxHeight,
      }}
    >
      <div
        style={{
          columns: "3 200px",
          columnGap: "1rem",
          padding: "1rem",
        }}
      >
        {Array.from(Array(20)).map((_, i) => (
          <Paper
            style={{
              width: "100%",
              height: Math.round(100 + Math.random() * 100),
              margin: "0 1rem 1rem 0",
              display: "inline-block",
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default DashboardContent;
