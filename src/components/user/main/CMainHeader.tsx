import {
  DensityMedium,
  NotificationsNone,
  ArrowBackIos,
} from "@mui/icons-material";
import { Box, IconButton, styled } from "@mui/material";
import { useRecoilState, useRecoilValue } from "recoil";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { userState } from "@/recoil/atoms/userState";
import CButton from "@/components/button";
import { menuDrawerStatus } from "@/recoil/atoms/modalStatus";

const CMainHeader = () => {
  const user = useRecoilValue(userState);
  const path = useLocation().pathname.split("/")[1];
  const navigate = useNavigate();
  const [menu, setMenu] = useRecoilState(menuDrawerStatus);

  return (
    <Header>
      {user.isAuth ? (
        <Box sx={Container}>
          <Logo>
            <Link to="">CarpeDiem</Link>
          </Logo>
          <Box>
            <IconButton
              disableRipple
              sx={AlarmIcon}
              aria-label="alarm"
              onClick={() => console.log("알림")}
            >
              <NotificationsNone sx={{ fontSize: "25px" }} />
            </IconButton>
            <IconButton
              disableRipple
              sx={MenuIcon}
              aria-label="menu"
              onClick={() => setMenu(!menu)}
            >
              <DensityMedium sx={{ fontSize: "20px" }} />
            </IconButton>
          </Box>
        </Box>
      ) : (
        <Box sx={Container2}>
          <IconButton
            disableRipple
            sx={AlarmIcon}
            aria-label="alarm"
            onClick={() => console.log("이전")}
          >
            <ArrowBackIos sx={{ fontSize: "16px" }} />
          </IconButton>
          <NickName>{path}</NickName>
          <Box>
            <CButton
              style={SmallButton}
              type="blue"
              onClick={() => navigate("/login")}
            >
              로그인
            </CButton>
            <CButton
              style={SmallButton}
              type="blueBorder"
              onClick={() => navigate("/join")}
            >
              가입하기
            </CButton>
          </Box>
        </Box>
      )}
    </Header>
  );
};

export default CMainHeader;

const Header = styled("header")(({ theme }) => ({
  borderBottom: theme.palette.background.border,
}));
const Container = {
  display: "flex",
  justifyContent: "space-between",
  padding: "8px 10px",
  width: "100%",
  maxWidth: "975px",
  margin: "0 auto",
};
const Logo = styled("h1")(({ theme }) => ({
  display: "inline-block",
  height: "35px",
  lineHeight: "35px",
  a: {
    color: theme.palette.text.main,
    fontSize: "18px",
    textAlign: "center",
    fontFamily: "Sonsie One !important",
    marginBottom: "30px",
  },
}));
const AlarmIcon = {
  padding: 0,
  margin: "5px",
  color: "text.default",
  "&:hover": {
    bgcolor: "transparent",
  },
};
const MenuIcon = {
  padding: 0,
  margin: "5px 0 5px 5px",
  color: "text.default",
  "&:hover": {
    bgcolor: "transparent",
  },
};

const Container2 = {
  display: "flex",
  justifyContent: "space-between",
  padding: "8px 10px",
  width: "100%",
  maxWidth: "975px",
  margin: "0 auto",
};
const NickName = styled("h1")(({ theme }) => ({
  height: "35px",
  lineHeight: "35px",
  color: theme.palette.text.default,
  fontSize: "14px",
  fontWeight: 500,
}));

const SmallButton = {
  padding: "5px 8px",
  marginLeft: "10px",
  "&.MuiButton-root": {
    minWidth: "fit-content !important",
  },
};
