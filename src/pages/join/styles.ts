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
  justifyContent: "space-between",
  gap: "10px",
  "button:focus": {
    outline: "2px dashed red",
  },
};
export const FormInputId = {
  width: "100%",
  marginBottom: "10px",
  div: {
    height: "43px",
  },
  label: {
    fontSize: "12px",
    color: "text.main",
    top: "-2px",
  },
  input: {
    fontSize: "12px",
  },
  "& label.Mui-focused": {
    color: "text.main",
    transform: "translate(22px, -2px) scale(0.75)",
  },
  "& .Mui-focused fieldset": {
    borderColor: "form.input",
  },
  "&.focused label": {
    transform: "translate(22px, -2px) scale(0.75)",
  },
};
export const FormInputPw = {
  width: "100%",
  marginBottom: "10px",
  div: {
    height: "45px",
  },
  label: {
    fontSize: "12px",
    color: "text.main",
    top: "-2px",
  },
  input: {
    fontSize: "12px",
  },
  "& label.Mui-focused": {
    color: "text.main",
    transform: "translate(22px, -2px) scale(0.75)",
  },
  "& .Mui-focused fieldset": {
    borderColor: "form.input",
  },
  "&.focused label": {
    transform: "translate(22px, -2px) scale(0.75)",
  },
};
export const FormInputPwCheck = {
  width: "100%",
  marginBottom: "10px",
  div: {
    height: "45px",
  },
  label: {
    fontSize: "12px",
    color: "text.main",
    top: "-2px",
  },
  input: {
    fontSize: "12px",
  },
  "& label.Mui-focused": {
    color: "text.main",
    transform: "translate(22px, -2px) scale(0.75)",
  },
  "& .Mui-focused fieldset": {
    borderColor: "form.input",
  },
  "&.focused label": {
    transform: "translate(22px, -2px) scale(0.75)",
  },
};
export const FormInputBirth = {
  width: "100%",
  marginBottom: "10px",
  div: {
    height: "45px",
  },
  label: {
    fontSize: "12px",
    color: "text.main",
    top: "-2px",
  },
  input: {
    fontSize: "12px",
  },
  "& label.Mui-focused": {
    color: "text.main",
    transform: "translate(22px, -2px) scale(0.75)",
  },
  "& .Mui-focused fieldset": {
    borderColor: "form.input",
  },
  "&.focused label": {
    transform: "translate(22px, -2px) scale(0.75)",
  },
};
export const FormInputName = {
  width: "100%",
  marginBottom: "10px",
  div: {
    height: "45px",
  },
  label: {
    fontSize: "12px",
    color: "text.main",
    top: "-2px",
  },
  input: {
    fontSize: "12px",
  },
  "& label.Mui-focused": {
    color: "text.main",
    transform: "translate(22px, -2px) scale(0.75)",
  },
  "& .Mui-focused fieldset": {
    borderColor: "form.input",
  },
  "&.focused label": {
    transform: "translate(22px, -2px) scale(0.75)",
  },
};
export const FormInputPhone = {
  width: "100%",
  marginBottom: "10px",
  div: {
    height: "45px",
  },
  label: {
    fontSize: "12px",
    color: "text.main",
    top: "-2px",
  },
  input: {
    fontSize: "12px",
  },
  "& label.Mui-focused": {
    color: "text.main",
    transform: "translate(22px, -2px) scale(0.75)",
  },
  "& .Mui-focused fieldset": {
    borderColor: "form.input",
  },
  "&.focused label": {
    transform: "translate(22px, -2px) scale(0.75)",
  },
};
export const FormInputEmail = {
  width: "100%",
  marginBottom: "10px",
  div: {
    height: "45px",
  },
  label: {
    fontSize: "12px",
    color: "text.main",
    top: "-2px",
  },
  input: {
    fontSize: "12px",
  },
  "& label.Mui-focused": {
    color: "text.main",
    transform: "translate(22px, -2px) scale(0.75)",
  },
  "& .Mui-focused fieldset": {
    borderColor: "form.input",
  },
  "&.focused label": {
    transform: "translate(22px, -2px) scale(0.75)",
  },
};
export const ErrorText = {
  color: "red",
  fontSize: "12px",
  fontWeight: "500",
  marginBottom: "10px",
};
