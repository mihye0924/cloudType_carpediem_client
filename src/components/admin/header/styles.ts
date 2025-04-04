import { styled, Theme } from "@mui/material";

export const Header = styled("header")(({ theme }: { theme: Theme }) => ({
  borderBottom: theme.palette.background.border,
}));
export const Container = {
  display: "flex",
  justifyContent: "space-between",
  padding: "8px 10px",
  width: "100%",
  maxWidth: "975px",
  margin: "0 auto",
};
export const H1 = styled("h1")(({ theme }: { theme: Theme }) => ({
  display: "inline-block",
  height: "35px",
  lineHeight: "35px",
  a: {
    color: theme.palette.text.main,
    fontSize: "18px",
    textAlign: "center",
    fontFamily: "Sonsie One !important",
    marginBottom: "30px",
  },
}));
