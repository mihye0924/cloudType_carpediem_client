import { Box } from "@mui/material";
import { ErrorOutlineOutlined } from "@mui/icons-material";
import CButton from "@/components/button";
import { Section } from "@/pages/not-found/styles";

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
