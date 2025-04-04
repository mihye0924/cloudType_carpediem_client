import { Box, Modal } from "@mui/material";
import CButton from "@/components/button";
import { AlertText, Section } from "@/components/alert/styles";
import { AlertProps } from "@/components/alert/types";

const ModalStyle = {};

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
