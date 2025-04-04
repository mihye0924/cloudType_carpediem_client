import { styled } from "@mui/material";

// 스타일
export const Container = {
  width: "480px",
  maxWidth: "100%",
  margin: "0 auto",
  padding: "0 10px",
};
export const H1 = styled("h1")(({ theme }) => ({
  color: theme.palette.text.main,
  fontSize: "32px",
  textAlign: "center",
  fontFamily: "Sonsie One !important",
  marginBottom: "30px",
}));
export const InputInner = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
};
export const FormInputId = {
  input: {
    height: "45px",
    padding: "0px 20px 0 40px",
    fontSize: "12px",
    fontWeight: "300",
  },
  label: {
    color: "text.default",
    fontSize: "12px",
    left: "25px",
    top: "-2px",
  },
  "& label.Mui-focused": {
    color: "text.main",
    transform: "translate(0px, -2px) scale(0.75)",
  },
  "& .Mui-focused fieldset": {
    borderColor: "form.input",
  },
  "&.focused label": {
    transform: "translate(0px, -4px) scale(0.75)",
  },
  "& div": {
    position: "relative",
    "&::after": {
      top: "12px",
      left: "10px",
      position: "absolute",
      content: "''",
      display: "inline-block",
      width: "20px",
      height: "20px",
      background: "url('/assets/images/id-icon.svg') 100% no-repeat",
    },
  },
};
export const FormInputPw = {
  input: {
    height: "45px",
    padding: "0px 20px 0 40px",
    fontSize: "12px",
    fontWeight: "300",
  },
  label: {
    color: "text.default",
    fontSize: "12px",
    left: "25px",
    top: "-2px",
  },
  "&.focused label": {
    transform: "translate(0px, -2px) scale(0.75)",
  },
  "& label.Mui-focused": {
    color: "text.main",
    transform: "translate(0px, -2px) scale(0.75)",
  },
  "& .Mui-focused fieldset": {
    borderColor: "form.input",
  },
  "& div": {
    position: "relative",
    "&::after": {
      top: "12px",
      left: "10px",
      position: "absolute",
      content: "''",
      display: "inline-block",
      width: "20px",
      height: "20px",
      background: "url('/assets/images/pw-icon.svg') 100% no-repeat",
    },
  },
};
export const FormCheck = {
  marginLeft: 0,
  svg: {
    color: "form.checkbox",
  },
  span: {
    color: "text.default",
    "&:last-child": {
      marginLeft: "5px",
      fontSize: "12px",
      fontWeight: 500,
    },
    "&.Mui-checked": {
      color: "background.main",
    },
  },
  ">span": {
    padding: 0,
  },
};
export const LinkText = styled("a")(({ theme }) => ({
  position: "relative",
  fontSize: "12px",
  color: theme.palette.text.default,
  "&:not(:last-child)": {
    marginRight: "30px",
  },
  "&:nth-of-type(1)": {
    "&::after": {
      content: "''",
      width: "1px",
      height: "10px",
      backgroundColor: theme.palette.text.default,
      position: "absolute",
      top: "50%",
      marginLeft: "15px",
      transform: "translateY(-50%)",
    },
  },
  "&:nth-of-type(2)": {
    "&::after": {
      content: "''",
      width: "1px",
      height: "10px",
      backgroundColor: theme.palette.text.default,
      position: "absolute",
      top: "50%",
      marginLeft: "15px",
      transform: "translateY(-50%)",
    },
  },
}));
