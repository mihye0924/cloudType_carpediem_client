import { Box, styled } from "@mui/material";
import { ErrorOutlineOutlined } from "@mui/icons-material";
import CButton from "@/components/CButton";

const Section = styled("section")(({ theme }) => ({
  width: "100%",
  height: "100vh",
  overflowY: "auto",
  maxWidth: "975px",
  margin: "0 auto",
  position: "relative",
  div: {
    position: "absolute",
    textAlign: "center",
    top: "50%",
    left: "50%",
    padding: "0 10px",
    transform: "translate(-50%,-50%)",
    width: "100%",
  },
  svg: {
    fontSize: "50px",
    marginBottom: "20px",
    color: theme.palette.text.main,
  },
  p: {
    fontSize: "20px",
    fontWeight: "500",
    marginBottom: "10px",
    lineHeight: 1.5,
    color: theme.palette.text.default,
  },
  span: {
    display: "block",
    lineHeight: 1.5,
    color: theme.palette.text.default,
  },
}));

const NotFoundPage = () => {
  return (
    <Section>
      <Box>
        <ErrorOutlineOutlined />
        <p>요청하신 페이지를 찾을 수 없습니다.</p>
        <span>
          입력하신 주소가 잘못되었거나, 사용이 일시 중단되어 요청하신 페이지를
          찾을 수 없습니다.
        </span>
        <span>서비스 이용에 불편을 드려 죄송합니다.</span>
        <CButton type="blue" medium style={{ marginTop: "30px" }}>
          메인 페이지
        </CButton>
      </Box>
    </Section>
  );
};

export default NotFoundPage;
