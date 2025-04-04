import { ButtonProps } from "@/types/common";
import { Button } from "@mui/material";
import { ForwardedRef, forwardRef } from "react";

const CButton = forwardRef(
  (props: ButtonProps, ref: ForwardedRef<HTMLButtonElement>) => {
    return (
      <Button
        disableRipple
        ref={ref}
        sx={{
          ...props.style,
          fontWeight: "500",
          borderRadius: "5px",
          width: props.large
            ? "100%"
            : props.medium
            ? "50%"
            : props.small
            ? "30%"
            : "",
          boxSizing: "border-box",
          border:
            props.type === "blueBorder"
              ? "1px solid #2d4b97"
              : "2px solid transparent",
          bgcolor:
            props.type === "blue"
              ? "blueBtn.main"
              : props.type === "lightgray"
              ? "grayBtn.main"
              : "#fff",
          "&:hover": {
            border: props.type === "lightgray" ? 2 : "",
            borderColor: props.type === "lightgray" ? "grayBtn.border" : "",
            bgcolor:
              props.type === "blue"
                ? "blueBtn.dark"
                : props.type === "lightgray"
                ? "grayBtn.light"
                : "#ebebeb",
            color: props.type === "lightgray" ? "grayBtn.hoverText" : "",
          },
          color:
            props.type === "blue"
              ? "blueBtn.contrastText"
              : props.type === "lightgray"
              ? "grayBtn.contrastText"
              : props.type === "blueBorder"
              ? "blueBtn.main"
              : "",
        }}
        onClick={props.onClick}
      >
        {props.children}
      </Button>
    );
  }
);

export default CButton;
