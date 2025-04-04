import { Box } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import CButton from "@/components/button";
import { Container, H1, Header } from "@/components/admin/header/styles";

const AHeader = () => {
  const path = useLocation();
  const router = path.pathname;

  return (
    <Header>
      <Box sx={Container}>
        <H1>
          <Link to="">CarpeDiem</Link>
        </H1>
        {router === "/admin" && (
          <>
            <CButton
              style={{ padding: "0 20px" }}
              type="lightgray"
              onClick={() => console.log("로그아웃")}
            >
              로그아웃
            </CButton>
          </>
        )}
      </Box>
    </Header>
  );
};

export default AHeader;
