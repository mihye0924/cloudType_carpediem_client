import { Box, Modal, styled } from "@mui/material";
import CButton from "@/components/CButton";
import { AlertProps } from "@/types/common";

const ModalStyle = {};

const Section = styled("section")(() => ({
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

const AlertText = styled("div")(() => ({
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

const CAlert = (props: AlertProps) => {
  return (
    <Modal open={props.open} sx={ModalStyle}>
      <Section>
        <AlertText>
          <p>{props.children} </p>
          <Box sx={{ display: "flex", gap: "5px" }}>
            {props.onYesButton && (
              <CButton type="blue" onClick={props.onYesButton}>
                네
              </CButton>
            )}
            {props.onNoButton && (
              <CButton type="blueBorder" onClick={props.onNoButton}>
                아니요
              </CButton>
            )}
          </Box>
          {props.onClose && (
            <CButton type="blue" onClick={props.onClose}>
              닫기
            </CButton>
          )}
        </AlertText>
      </Section>
    </Modal>
  );
};

export default CAlert;
