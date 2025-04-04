import CModal from "@/components/modal";
import CButton from "@/components/button";
import { Box, Checkbox, FormControlLabel, TextField } from "@mui/material";
import { ChangeEvent, useRef, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { userState } from "@/recoil/atoms/userState";
import CAlert from "@/components/alert";
import {
  Container,
  H1,
  InputInner,
  FormInputId,
  FormInputPw,
  FormCheck,
  LinkText,
} from "@/pages/login/styles";

// page
const LoginPage = () => {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const user = useSetRecoilState(userState);
  const [alert, setAlert] = useState("");
  const [alertStatus, setAlertStatus] = useState("");

  const idRef = useRef<HTMLInputElement>(null);
  const pwRef = useRef<HTMLInputElement>(null);

  // 유효성 검사
  const validationCheck = () => {
    if (id === "") {
      (idRef.current?.children[1].children[0] as HTMLElement).focus();
      setAlert("아이디를 입력해주세요.");
      return false;
    }
    if (pw === "") {
      (pwRef.current?.children[1].children[0] as HTMLElement).focus();
      setAlert("비밀번호를 입력해주세요.");
      return false;
    }
    return postData();
  };

  // 로그인 post요청
  const postData = async () => {
    const data = {
      user_id: id,
      user_pw: pw,
    };
    await axios({
      method: "post",
      url: `${import.meta.env.VITE_BACK_URL}/user/login`,
      data: data,
      withCredentials: true,
    })
      .then((res) => {
        if (res.data.code === 200) {
          setAlert("로그인 되었습니다.");
          if (res.data.user_id === "admin") {
            setAlertStatus("adminSuccess");
          } else {
            setAlertStatus("loginSuccess");
          }
          user({
            isAuth: res.data.isAuth,
            user_id: res.data.user_id,
            role: res.data.role,
            token: res.data.token,
          });
        } else {
          setAlert("로그인에 실패하였습니다.");
          return false;
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <CModal darkMode onClose={() => navigate("/")} open={true}>
      <Box sx={Container}>
        <H1>CarpeDiem</H1>
        <Box sx={InputInner}>
          <TextField
            sx={FormInputId}
            className={`${id && "focused"}`}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setId(event.target.value);
            }}
            value={id}
            ref={idRef}
            label="아이디를 입력해주세요"
            variant="outlined"
          />
          <TextField
            sx={FormInputPw}
            className={`${pw && "focused"}`}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setPw(event.target.value);
            }}
            ref={pwRef}
            value={pw}
            type="password"
            label="비밀번호를 입력해주세요"
            variant="outlined"
          />
        </Box>
        <CButton
          large
          type="blue"
          onClick={validationCheck}
          style={{ padding: "10px 0", mt: "10px", height: "45px" }}
        >
          로그인
        </CButton>
        <Box sx={{ mt: "10px" }}>
          <FormControlLabel
            sx={FormCheck}
            control={<Checkbox />}
            label="로그인 유지"
            onChange={() => setAlert("준비중입니다.")}
          />
        </Box>
        <Box
          sx={{
            marginTop: "40px",
            display: "flex",
            justifyContent: "center",
            whiteSpace: "pre",
          }}
        >
          <LinkText href="/login/id">아이디 찾기</LinkText>
          <LinkText href="/login/pw">비밀번호 찾기</LinkText>
          <LinkText href="/join">회원가입</LinkText>
        </Box>
      </Box>
      {
        <CAlert
          open={alert !== ""}
          onClose={() => {
            setAlert("");
            switch (alertStatus) {
              case "adminSuccess":
                navigate(`/${id}`);
                return false;
              case "loginSuccess":
                navigate(`/${id}/account`);
                return false;
              default:
                return false;
            }
          }}
        >
          <>{alert}</>
        </CAlert>
      }
    </CModal>
  );
};
export default LoginPage;
