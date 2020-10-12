import styled from "@material-ui/core/styles/styled";

const Listbox = styled("ul")({
  width: 300,
  margin: "2px 0 0",
  padding: 0,
  position: "fixed",
  listStyle: "none",
  backgroundColor: "#fff",
  overflow: "auto",
  maxHeight: 250,
  borderRadius: 4,
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
  zIndex: 1,
  color: "#000",
  "& li": {
    padding: "5px 12px",
    display: "flex",

    "& span": {
      flexGrow: 1,
    },

    "& svg": {
      color: "transparent",
    },
  },

  '& li[aria-selected="true"]': {
    backgroundColor: "#fafafa",
    fontWeight: 600,

    "& svg": {
      color: "#1890ff",
    },
  },

  '& li[data-focus="true"]': {
    backgroundColor: "#e6f7ff",
    cursor: "pointer",

    "& svg": {
      color: "#000",
    },
  },
});

export default Listbox;
