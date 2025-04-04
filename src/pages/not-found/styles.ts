import { styled } from "@mui/material";

export const Section = styled("section")(({ theme }) => ({
  width: "100%",
  height: "100vh",
  overflowY: "auto",
  maxWidth: "975px",
  margin: "0 auto",
  position: "relative",
  div: {
    position: "absolute",
    textAlign: "center",
    top: "50%",
    left: "50%",
    padding: "0 10px",
    transform: "translate(-50%,-50%)",
    width: "100%",
  },
  svg: {
    fontSize: "50px",
    marginBottom: "20px",
    color: theme.palette.text.main,
  },
  p: {
    fontSize: "20px",
    fontWeight: "500",
    marginBottom: "10px",
    lineHeight: 1.5,
    color: theme.palette.text.default,
  },
  span: {
    display: "block",
    lineHeight: 1.5,
    color: theme.palette.text.default,
  },
}));
