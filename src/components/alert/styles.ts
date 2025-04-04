import styled from "@emotion/styled";

export const Section = styled("section")(() => ({
  svg: {
    position: "absolute",
    right: "10px",
    top: "10px",
    cursor: "pointer",
  },
  p: {
    textAlign: "center",
    marginBottom: "20px",
    padding: "0 20px",
    lineHeight: "1.5",
  },
  position: "absolute",
  width: "300px",
  height: "200px",
  background: "#fff",
  borderRadius: "5px",
  top: "50%",
  left: "50%",
  transform: "translate(-50%,-50%)",
}));

export const AlertText = styled("div")(() => ({
  display: "flex",
  width: "100%",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%,-50%)",
}));
