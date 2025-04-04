import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  styled,
} from "@mui/material";
import CButton from "../../button";
import { InsertLink, PersonAddAlt, Verified } from "@mui/icons-material";
import { useLocation } from "react-router";
import { useRecoilState, useRecoilValue } from "recoil";
import { userState } from "@/recoil/atoms/userState";
import { profileModalStatus } from "@/recoil/atoms/modalStatus";
import { profileStatus } from "@/recoil/atoms/profileStatus";
import { listStatus } from "@/recoil/atoms/listState";
import CAlert from "@/components/alert";
import { useState } from "react";

const CMain = () => {
  const user = useRecoilValue(userState);
  const path = useLocation().pathname.split("/")[1];
  const [edit, setEdit] = useRecoilState(profileModalStatus); // 프로필 편집
  const profile = useRecoilValue(profileStatus); // 프로필 데이터
  const list = useRecoilValue(listStatus);
  const [alert, setAlert] = useState("");
  // const [alertStatus, setAlertStatus] = useState("")

  //프로필 링크 클릭
  const handleAccountLink = (url: string) => {
    window.location.href = `https://${url}`;
  };
  return (
    <Section>
      {user.isAuth ? (
        <Box sx={Container}>
          <Box sx={ProfileImg}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Box sx={ProfileImgBox}>
                <img
                  src={
                    profile.account_profile === "profile-dummy.svg"
                      ? `/assets/images/${profile.account_profile}`
                      : `${import.meta.env.VITE_BACK_URL}/uploads/profile/${
                          profile.account_profile
                        }`
                  }
                  alt="profile"
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "10px",
                }}
              >
                <Name>{path}</Name>
                {profile.account_badge > 0 && (
                  <Verified
                    sx={{
                      fontSize: "16px",
                      marginTop: "5px",
                      color: "text.main",
                    }}
                  />
                )}
              </Box>
            </Box>
            <Box>
              <List sx={ProfileList}>
                <ListItem>
                  <ListItemButton
                    disableRipple
                    sx={{ flexDirection: "column", padding: 0 }}
                    onClick={() => console.log("게시물")}
                  >
                    <p>{list.length}</p>
                    <p>게시물</p>
                  </ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton
                    disableRipple
                    sx={{ flexDirection: "column", padding: 0 }}
                    onClick={() => console.log("팔로워")}
                  >
                    <p>{profile.account_followers}</p>
                    <p>팔로워</p>
                  </ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton
                    disableRipple
                    sx={{ flexDirection: "column", padding: 0 }}
                    onClick={() => console.log("팔로잉")}
                  >
                    <p>{profile.account_following}</p>
                    <p>팔로잉</p>
                  </ListItemButton>
                </ListItem>
              </List>
            </Box>
          </Box>
          <Box sx={ProfileText}>
            {profile.account_info && <P>{profile.account_info}</P>}
            {profile.account_link && (
              <Box>
                <InsertLink />
                <CButton
                  onClick={() => handleAccountLink(profile.account_link)}
                >
                  {profile.account_link}
                </CButton>
              </Box>
            )}
          </Box>
          <Box sx={ProfileBtn}>
            {user.account_name === path ? (
              <>
                <CButton
                  type="lightgray"
                  style={{ flex: 1, whiteSpace: "pre", height: "35px" }}
                  onClick={() => {
                    setEdit(!edit);
                  }}
                >
                  프로필편집
                </CButton>
                <CButton
                  type="lightgray"
                  style={{ flex: 1, whiteSpace: "pre", height: "35px" }}
                  onClick={() => console.log("프로필공유")}
                >
                  프로필공유
                </CButton>
                <IconButton
                  disableRipple
                  sx={PlusFriendsBtn}
                  aria-label="menu"
                  onClick={() => console.log("플러스친구")}
                >
                  <PersonAddAlt />
                </IconButton>
              </>
            ) : (
              <>
                <CButton
                  type="blue"
                  style={{ flex: 1, whiteSpace: "pre", height: "35px" }}
                  onClick={() => setAlert("준비 중입니다.")}
                >
                  팔로우
                </CButton>
                <CButton
                  type="lightgray"
                  style={{ flex: 1, whiteSpace: "pre", height: "35px" }}
                  onClick={() => setAlert("준비 중입니다.")}
                >
                  메시지 보내기
                </CButton>
              </>
            )}
          </Box>
        </Box>
      ) : (
        <Box sx={Container}>
          <Box sx={ProfileImg} className={`${!user.isAuth && "not_login"}`}>
            <Box sx={{ display: "flex", flexDirection: "column", flex: 0 }}>
              <Box sx={ProfileImgBox}>
                <img
                  src={
                    profile.account_profile === "profile-dummy.svg"
                      ? `/assets/images/${profile.account_profile}`
                      : `${import.meta.env.VITE_BACK_URL}/uploads/profile/${
                          profile.account_profile
                        }`
                  }
                  alt="profile"
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                flex: 1,
              }}
            >
              <Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Name>{path}</Name>
                  {profile.account_badge > 0 && (
                    <Verified
                      sx={{
                        fontSize: "16px",
                        marginTop: "5px",
                        color: "text.main",
                      }}
                    />
                  )}
                </Box>
                <Box sx={ProfileText}>
                  {profile.account_info && <P>{profile.account_info}</P>}
                  {profile.account_link && (
                    <Box sx={{ height: "" }}>
                      <InsertLink />
                      <CButton
                        onClick={() => handleAccountLink(profile.account_link)}
                      >
                        {profile.account_link}
                      </CButton>
                    </Box>
                  )}
                </Box>
                <List sx={ProfileList2}>
                  <ListItem>
                    <ListItemButton
                      disableRipple
                      sx={{ padding: 0 }}
                      onClick={() => setAlert("로그인이 필요합니다.")}
                    >
                      <p>게시물</p>
                      <p>{list.length}</p>
                    </ListItemButton>
                  </ListItem>
                  <ListItem>
                    <ListItemButton
                      disableRipple
                      sx={{ padding: 0 }}
                      onClick={() => setAlert("로그인이 필요합니다.")}
                    >
                      <p>팔로워</p>
                      <p>{profile.account_followers}</p>
                    </ListItemButton>
                  </ListItem>
                  <ListItem>
                    <ListItemButton
                      disableRipple
                      sx={{ padding: 0 }}
                      onClick={() => setAlert("로그인이 필요합니다.")}
                    >
                      <p>팔로잉</p>
                      <p>{profile.account_following}</p>
                    </ListItemButton>
                  </ListItem>
                </List>
              </Box>
              <Box sx={ProfileBtn}>
                <CButton
                  type="blue"
                  style={{ flex: 1, whiteSpace: "pre", height: "35px" }}
                  onClick={() => setAlert("로그인이 필요합니다.")}
                >
                  팔로우
                </CButton>
                <CButton
                  type="lightgray"
                  style={{ flex: 1, whiteSpace: "pre", height: "35px" }}
                  onClick={() => setAlert("로그인이 필요합니다.")}
                >
                  메시지 보내기
                </CButton>
                <IconButton
                  disableRipple
                  sx={PlusFriendsBtn}
                  aria-label="menu"
                  onClick={() => setAlert("로그인이 필요합니다.")}
                >
                  <PersonAddAlt />
                </IconButton>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
      {
        <CAlert
          open={alert !== ""}
          onClose={() => {
            setAlert("");
          }}
        >
          <>{alert}</>
        </CAlert>
      }
    </Section>
  );
};

export default CMain;

const Section = styled("section")(({ theme }) => ({
  borderBottom: theme.palette.background.border,
}));
const Container = {
  width: "100%",
  maxWidth: "975px",
  padding: "10px",
  margin: "0 auto",
};
const ProfileImg = {
  display: "flex",
  justifyContent: "space-between",
  gap: "15px",
  span: {
    fontSize: "14px",
    fontWeight: "400",
    letterSpacing: "-1px",
    marginTop: "15px",
    color: "text.default",
  },
  "&.not_login": {
    height: "194px",
  },
};
const ProfileImgBox = {
  width: "80px",
  height: "80px",
  flexBasis: "80px",
  borderRadius: "50%",
  overflow: "hidden",
  img: {
    width: "100%",
  },
};
const ProfileList = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  "& li": {
    padding: 0,
    marginRight: "25px",
  },
  "& div": {
    backgroundColor: "transparent !important",
  },
  "& p:nth-of-type(1)": {
    fontWeight: "400",
    color: "text.default",
  },
  "& p:nth-of-type(2)": {
    marginTop: "10px",
    fontWeight: "400",
    fontSize: "14px",
    whiteSpace: "pre",
    color: "text.default",
  },
};
const ProfileList2 = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  width: "260px",
  padding: "5px 0",
  "& li": {
    padding: 0,
    marginRight: "15px",
  },
  "& div": {
    backgroundColor: "transparent !important",
  },
  "& p:nth-of-type(1)": {
    fontWeight: "400",
    color: "text.default",
    fontSize: "14px",
  },
  "& p:nth-of-type(2)": {
    marginLeft: "10px",
    fontWeight: "400",
    fontSize: "14px",
    whiteSpace: "pre",
    color: "text.default",
  },
};
const ProfileBtn = {
  marginTop: "10px",
  display: "flex",
  justifyContent: "space-between",
  gap: "10px",
};
const PlusFriendsBtn = {
  flex: 0,
  height: "35px",
  bgcolor: "grayBtn.main",
  borderRadius: "5px",
  border: "2px solid transparent",
  boxSizing: "box-sizing",
  "&:hover": {
    bgcolor: "grayBtn.light",
    border: 2,
    borderColor: "grayBtn.border",
    "& .MuiSvgIcon-root": {
      color: "grayBtn.hoverText",
    },
  },
};
const Name = styled("span")(() => ({
  marginTop: "0 !important",
  marginRight: "5px",
}));
const ProfileText = {
  margin: "5px 0",
  "& p": {
    height: "20px",
    lineHeight: "1.5",
  },
  div: {
    display: "flex",
    height: "20px",
    button: {
      justifyContent: "flex-start",
      width: "auto",
      padding: 0,
      color: "text.main",
      fontSize: "12px",
      height: "20px",
      textTransform: "lowercase",
      "&:hover": {
        backgroundColor: "transparent",
      },
    },
    svg: {
      color: "text.main",
      marginTop: "3px",
      fontSize: "18px",
      transform: "rotate(-45deg)",
    },
  },
};
const P = styled("p")(({ theme }) => ({
  fontWeight: "500",
  color: theme.palette.text.default,
  fontSize: "14px",
}));
