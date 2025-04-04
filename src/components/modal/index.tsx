import CButton from "@/components/button";
import { Box, Modal } from "@mui/material";
import { Close, ArrowBackIosNew } from "@mui/icons-material";
import { NextButton, Section1, Section2 } from "@/components/modal/styles";
import { ModalProps } from "@/components/modal/types";

const CModal = (props: ModalProps) => {
  return (
    <Modal open={props.open} onClose={props.onClose}>
      <Box
        sx={{
          ...props.style,
          width: "100%",
          height: "100%",
          backgroundColor: props.darkMode ? "background.default" : "",
          "&:focus": {
            outline: "none",
          },
        }}
      >
        <Section1>
          <Box>
            {props.icon === "prev" && (
              <ArrowBackIosNew
                sx={{ color: "text.default", fontSize: "18px" }}
                onClick={props.onPrev}
              />
            )}
          </Box>
          <p>{props.title}</p>
          <Box>
            {props.icon === "close" && (
              <Close sx={{ color: "text.default" }} onClick={props.onClose} />
            )}
            {props.nextBtn && (
              <CButton small style={NextButton} onClick={props.onNext}>
                <span>{props.nextTitle}</span>
              </CButton>
            )}
          </Box>
        </Section1>
        <Section2>{props.children}</Section2>
      </Box>
    </Modal>
  );
};

export default CModal;
