import React from "react";
import CloseIcon from "@material-ui/icons/Close";
import styled from "@material-ui/core/styles/styled";

const Tag = styled(({ label, onDelete, ...props }) => (
  <div {...props}>
    <span>{label}</span>
    <CloseIcon onClick={onDelete} />
  </div>
))({
  display: "flex",
  alignItems: "center",
  height: 24,
  margin: 2,
  lineHeight: 22,
  backgroundColor: "inherit",
  border: "1px solid #e8e8e8",
  borderRadius: 2,
  boxSizing: "content-box",
  padding: "0 4px 0 10px",
  outline: 0,
  overflow: "hidden",

  "&:focus": {
    borderColor: "#40a9ff",
    backgroundColor: "#e6f7ff",
  },

  "& span": {
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },

  "& svg": {
    fontSize: 12,
    cursor: "pointer",
    padding: 4,
  },
});

export default Tag;
