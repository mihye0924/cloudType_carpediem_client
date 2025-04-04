import { ForwardedRef, forwardRef } from "react";
import { Button } from "@mui/material";
import { ButtonProps } from "@/components/button/types";
import { getButtonStyles } from "@/components/button/styles";

const CButton = forwardRef(
  (props: ButtonProps, ref: ForwardedRef<HTMLButtonElement>) => {
    return (
      <Button
        disableRipple
        ref={ref}
        sx={getButtonStyles(props)}
        onClick={props.onClick}
      >
        {props.children}
      </Button>
    );
  }
);

export default CButton;
