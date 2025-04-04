import { styled, Theme } from "@mui/material";

export const Section1 = styled("section")(({ theme }: { theme: Theme }) => ({
  position: "relative",
  display: "flex",
  justifyContent: "space-between",
  padding: "10px",
  height: "50px",
  alignItems: "center",
  borderBottom: theme.palette.background.border,
  p: {
    fontWeight: "bold",
    color: theme.palette.text.default,
  },
}));
export const Section2 = styled("section")(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  maxWidth: "975px",
  margin: "0 auto",
  height: "calc( 100vh - 50px )",
}));

export const NextButton = {
  "&.MuiButtonBase-root": {
    backgroundColor: "#eff4ff",
    minWidth: "55px",
    height: "28px",
    fontSize: "10px",
    padding: "2px",
  },
};
