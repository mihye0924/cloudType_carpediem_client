import { Box, Modal, styled } from "@mui/material";
import { Close, ArrowBackIosNew } from "@mui/icons-material";
import CButton from "@/components/CButton";
import { ModalProps } from "@/types/common";

const Section1 = styled("section")(({ theme }) => ({
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
const Section2 = styled("section")(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  maxWidth: "975px",
  margin: "0 auto",
  height: "calc( 100vh - 50px )",
}));

const NextButton = {
  "&.MuiButtonBase-root": {
    backgroundColor: "#eff4ff",
    minWidth: "55px",
    height: "28px",
    fontSize: "10px",
    padding: "2px",
  },
};

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
