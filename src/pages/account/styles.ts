import { styled } from "@mui/material";

// 스타일
export const Container = styled("div")(() => ({
  backgroundColor: "#ebf1ff",
}));
export const Section = styled("section")(() => ({
  position: "relative",
  width: "480px",
  height: "100vh",
  maxWidth: "100%",
  margin: "0 auto",
  padding: "0 10px",
}));
export const Logo = styled("h1")(() => ({
  color: "#2d4b97",
  fontSize: "30px",
  textAlign: "center",
  fontFamily: "Sonsie One !important",
  marginBottom: "30px",
}));
export const AccountWrap = {
  position: "absolute",
  padding: "0 10px",
  width: "100%",
  top: "50%",
  left: "50%",
  transform: "translate(-50%,-50%)",
  ul: {
    position: "relative",
    overflowY: "auto",
    minHeight: "200px",
    height: "50vh",
    padding: 0,
    "&::-webkit-scrollbar": {
      width: "10px",
      backgroundColor: "#f1f1f1",
    },
    "&::-webkit-scrollbar-thumb": {
      width: "10px",
      backgroundColor: "#2d4b97",
      backgroundClip: "padding-box",
      border: "2px solid transparent",
      borderRadius: "30px",
    },
    "&.no_height": {
      minHeight: "0",
      height: "0",
    },
  },
  li: {
    backgroundColor: "#fff",
    borderRadius: "10px",
    overflow: "hidden",
    padding: "20px",
    border: "1px solid #f1f1f1",
  },
  "li:not(:last-child)": {
    marginBottom: "10px",
  },
  button: {
    display: "flex",
    flexWrap: "wrap",
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: "10px",
    padding: 0,
    "&:hover": {
      backgroundColor: "transparent",
    },
    div: {
      width: "50px",
      height: "50px",
      overflow: "hidden",
      borderRadius: "50%",
      img: {
        width: "100%",
      },
    },
    span: {
      textTransform: "lowercase",
      fontWeight: "500",
      fontSize: "14px",
    },
  },
};
export const AccountCreate = {
  padding: "10px !important",
  justifyContent: "center !important",
  marginTop: "30px",
  fontSize: "12px",
  "&.MuiButton-root": {
    "&:hover": {
      backgroundColor: "#162753",
    },
  },
};
export const FormInputId = {
  width: "100%",
  marginTop: "20px",
  backgroundColor: "#fff",
  div: {
    height: "45px",
  },
  input: {
    fontSize: "12px",
    color: "#393939",
  },
  "& .Mui-focused fieldset": {
    borderColor: "form.input",
    borderWidth: "1px !important",
  },
};
export const CreateModal = {
  "&.MuiBox-root": {
    textAlign: "center",
    backgroundColor: "background.default",
    width: "100%",
    maxWidth: "580px",
    maxHeight: "840px",
    position: "relative",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  ".MuiSvgIcon-root": {
    color: "#2d4b97",
  },
  section: {
    "&:first-of-type": {
      svg: {
        color: "text.default",
      },
    },
    "&:nth-of-type(2)": {
      flexDirection: "column",
      maxHeight: "calc( 840px - 50px )",
      lineHeight: "1.5",
      padding: "0 20px",
      alignItems: "baseline",
      justifyContent: "flex-start",
      h1: {
        fontWeight: "500",
        color: "text.default",
        fontSize: "20px",
        marginTop: "10px",
        marginBottom: "5px",
      },
      "& p": {
        color: "text.default",
        marginTop: "10px",
        fontSize: "14px",
      },
    },
  },
};
export const NextBtn = {
  marginTop: "10px",
};
export const ProfileImage = {
  border: "1px solid #f1f1f1",
  width: "65%",
  paddingTop: "65%",
  overflow: "hidden",
  position: "relative",
  borderRadius: "50%",
  margin: "50px auto 0 auto",
  img: {
    objectPosition: "top",
    objectFit: "cover",
    width: "100%",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
};
export const ProfileButton = {
  width: "100%",
  height: "45px",
  "&:hover": {
    backgroundColor: "#162753",
  },
  backgroundColor: "#2d4b97",
  color: "#fff",
  margin: "30px 0 10px 0",
};
export const DeleteBtn = {
  "&.MuiButton-root": {
    width: "0",
  },
  minWidth: "30px",
  svg: {
    color: "#2d4b97",
  },
};
export const NotResultListFound = styled("div")(() => ({
  backgroundColor: "#fff",
  borderRadius: "8px",
  textAlign: "center",
  fontWeight: 900,
  fontSize: "12px",
  height: "200px",
  lineHeight: "200px",
  border: "1px solid #f1f1f1",
}));
