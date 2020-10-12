import styled from "@material-ui/core/styles/styled";

const InputWrapper = styled("div")({
  width: "100%",
  // border: `1px solid ${(props: any) => props.palette.grey[900]}`,
  backgroundColor: "inherit",
  borderRadius: 4,
  padding: 1,
  display: "flex",
  flexWrap: "wrap",

  "&:hover": {
    // borderColor: "#40a9ff",
  },

  "&.focused": {
    // borderColor: "#40a9ff",
    // boxShadow: "0 0 0 2px rgba(24, 144, 255, 0.2)",
  },

  "& input": {
    fontSize: "14px",
    height: 30,
    boxSizing: "border-box",
    padding: "4px 6px",
    width: 0,
    minWidth: 30,
    flexGrow: 1,
    border: 0,
    margin: 0,
    outline: 0,
  },
});

export default InputWrapper;
