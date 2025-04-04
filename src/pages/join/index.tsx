import CModal from "@/components/modal";
import CButton from "@/components/button";
import { useNavigate } from "react-router-dom";
import { Box, TextField } from "@mui/material";
import { ChangeEvent, useRef, useState } from "react";
import axios from "axios";
import CAlert from "@/components/alert";
import {
  Container,
  H1,
  InputInner,
  FormInputId,
  FormInputPw,
  FormInputPwCheck,
  FormInputBirth,
  FormInputName,
  FormInputPhone,
  FormInputEmail,
  ErrorText,
} from "@/pages/join/styles";

// page
const JoinPage = () => {
  const [id, setId] = useState("");
  const [idCheck, setIdCheck] = useState(false);
  const [pw, setPw] = useState("");
  const [pwCheck, setPwCheck] = useState("");
  const [name, setName] = useState("");
  const [birth, setBirth] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const idRef = useRef<HTMLInputElement>(null);
  const idCheckRef = useRef<HTMLButtonElement>(null);
  const pwRef = useRef<HTMLInputElement>(null);
  const pwCheckRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const birthRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const [idText, setIdText] = useState(false);
  const [pwText, setPwText] = useState(false);
  const [birthText, setBirthText] = useState(false);
  const [phoneText, setPhoneText] = useState(false);
  const [emailText, setEmailText] = useState(false);
  const [alert, setAlert] = useState("");
  const [alertStatus, setAlertStatus] = useState("");

  // 유효성 검사
  const validationCheck = () => {
    if (id === "") {
      (idRef.current?.children[1].children[0] as HTMLElement).focus();
      setAlert("아이디를 입력해주세요.");
      return false;
    }
    if (!idText) {
      (idRef.current?.children[1].children[0] as HTMLElement).focus();
      setAlert("아이디 4글자 이상 또는 12글자 이하로 작성해주세요.");
      return false;
    }
    if (!idCheck) {
      idCheckRef.current?.focus();
      setAlert("아이디 중복확인을 해주세요.");
      return false;
    }
    if (pw === "") {
      (pwRef.current?.children[1].children[0] as HTMLElement).focus();
      setAlert("비밀번호를 입력해주세요.");
      return false;
    }
    if (!pwText) {
      (pwRef.current?.children[1].children[0] as HTMLElement).focus();
      setAlert("8글자 이상, 영문, 숫자, 특수문자로 입력해주세요.");
      return false;
    }
    if (pwCheck === "") {
      (pwCheckRef.current?.children[1].children[0] as HTMLElement).focus();
      setAlert("재확인 비밀번호를 입력해주세요.");
      return false;
    }
    if (pw !== pwCheck) {
      (pwCheckRef.current?.children[1].children[0] as HTMLElement).focus();
      setAlert("비밀번호가 일치하지 않습니다.");
      return false;
    }
    if (name === "") {
      (nameRef.current?.children[1].children[0] as HTMLElement).focus();
      setAlert("이름을 입력해주세요.");
      return false;
    }
    if (birth === "") {
      (birthRef.current?.children[1].children[0] as HTMLElement).focus();
      setAlert("생년월일을 입력해주세요.");
      return false;
    }
    if (!birthText) {
      (birthRef.current?.children[1].children[0] as HTMLElement).focus();
      setAlert("생년월일이 일치하지 않습니다.");
      return false;
    }
    if (phone === "") {
      (phoneRef.current?.children[1].children[0] as HTMLElement).focus();
      setAlert("전화번호를 입력해주세요.");
      return false;
    }
    if (!phoneText) {
      (phoneRef.current?.children[1].children[0] as HTMLElement).focus();
      setAlert("전화번호가 일치하지 않습니다.");
      return false;
    }
    if (email === "") {
      (emailRef.current?.children[1].children[0] as HTMLElement).focus();
      setAlert("이메일을 입력해주세요.");
      return false;
    }
    if (!emailText) {
      (emailRef.current?.children[1].children[0] as HTMLElement).focus();
      setAlert("이메일이 일치하지 않습니다.");
      return false;
    }
    return postData();
  };

  // 회원가입 post 요청
  const postData = async () => {
    const data = {
      user_id: id,
      user_pw: pw,
      user_name: name,
      user_birth: birth,
      user_phone: phone,
      user_email: email,
      role: id !== "admin" ? 0 : 1,
    };
    await axios({
      method: "post",
      url: `${import.meta.env.VITE_BACK_URL}/user/join`,
      data: data,
      withCredentials: true,
    })
      .then((response) => {
        if (response.data.code === 200) {
          setAlert("회원가입에 성공하였습니다.");
          setAlertStatus("joinSuccess");
          return false;
        } else {
          setAlert("회원가입에 실패하였습니다.");
          setAlertStatus("joinFailed");
          return false;
        }
      })
      .catch((err) => console.log(err));
  };

  // 아이디 중복체크
  const handleIdCheck = async () => {
    if (id === "") {
      setAlert("아이디를 입력해주세요.");
      return false;
    }
    await axios({
      method: "get",
      url: `${import.meta.env.VITE_BACK_URL}/user/${id}`,
      withCredentials: true,
    })
      .then((response) => {
        if (response.data.code === 200) {
          setIdCheck(true);
          setAlert("사용 가능한 아이디입니다.");
          return false;
        } else {
          setIdCheck(false);
          setAlert("중복된 아이디입니다.");
          return false;
        }
      })
      .catch((err) => console.log(err));
  };

  // 아이디 유효성검사
  const idValueCheck = (str: string) => {
    const idRegex = /^[a-zA-Z0-9]{4,10}$/.test(str);
    setIdText(idRegex);
  };

  // 비밀번호 유효성 검사
  const pwValueCheck = (str: string) => {
    const pwRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
        str
      );
    setPwText(pwRegex);
  };

  // 생년월일 유효성 검사
  const birthValueCheck = (str: string) => {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/; //? YYYY-MM-DD 형식의 정규식
    const dateRegex2 = /^(19|20)\d{2}-(0[1-9]|1[0-2])-([0-2][1-9]|3[01])$/; //? 230613 kty YYYY-MM-DD 각 자리에 유효한 생년월일인지 확인

    dateRegex.test(str) || dateRegex2.test(str)
      ? setBirthText(true)
      : setBirthText(false);
  };

  // 전화번호 유효성 검사
  const phoneValueCheck = (str: string) => {
    const phoneRegex = /^(01[016789]{1})[0-9]{4}[0-9]{4}$/.test(str);
    setPhoneText(phoneRegex);
  };

  // 이메일 유효성 검사
  const emailValueCheck = (str: string) => {
    const emailRegx =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{3}$/i.test(
        str
      );
    setEmailText(emailRegx);
  };

  return (
    <CModal
      icon="close"
      darkMode
      onClose={() => navigate("/login")}
      open={true}
    >
      <Box sx={Container}>
        <H1>CarpeDiem</H1>
        <Box sx={InputInner}>
          <TextField
            sx={FormInputId}
            className={`${id && "focused"}`}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setId(event.target.value);
              idValueCheck(event.target.value);
            }}
            value={id}
            ref={idRef}
            label="아이디를 입력해주세요"
            variant="outlined"
          />
          <CButton
            small
            type="blue"
            ref={idCheckRef}
            onClick={handleIdCheck}
            style={{ height: "42px", whiteSpace: "pre" }}
          >
            중복확인
          </CButton>
        </Box>
        {!idText && id.length > 0 && (
          <Box sx={ErrorText}>
            아이디는 영문, 숫자 4~10자리로 입력해야합니다!
          </Box>
        )}
        <Box>
          <TextField
            sx={FormInputPw}
            className={`${pw && "focused"}`}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setPw(event.target.value);
              pwValueCheck(event.target.value);
            }}
            value={pw}
            ref={pwRef}
            type="password"
            label="비밀번호를 입력해주세요"
            variant="outlined"
          />
        </Box>
        {!pwText && pw.length > 0 && (
          <Box sx={ErrorText}>
            8글자 이상, 영문, 숫자, 특수문자로 입력해주세요.
          </Box>
        )}
        <Box>
          <TextField
            sx={FormInputPwCheck}
            className={`${pwCheck && "focused"}`}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setPwCheck(event.target.value);
            }}
            type="password"
            value={pwCheck}
            ref={pwCheckRef}
            label="재확인 비밀번호를 입력해주세요"
            variant="outlined"
          />
        </Box>
        {pw !== pwCheck && pwCheck.length > 0 && (
          <Box sx={ErrorText}>비밀번호가 일치하지 않습니다.</Box>
        )}
        <Box>
          <TextField
            sx={FormInputName}
            className={`${name && "focused"}`}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setName(event.target.value);
            }}
            value={name}
            ref={nameRef}
            label="이름을 입력해주세요"
            variant="outlined"
          />
        </Box>
        <Box>
          <TextField
            sx={FormInputBirth}
            className={`${birth && "focused"}`}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setBirth(event.target.value);
              birthValueCheck(event.target.value);
            }}
            value={birth}
            ref={birthRef}
            label="YYYY-MM-DD형식으로 입력해주세요"
            variant="outlined"
          />
          {!birthText && birth.length > 0 && (
            <Box sx={ErrorText}>생년월일 형식이 일치하지 않습니다.</Box>
          )}
        </Box>
        <Box>
          <TextField
            sx={FormInputPhone}
            className={`${phone && "focused"}`}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setPhone(event.target.value);
              phoneValueCheck(event.target.value);
            }}
            value={phone}
            ref={phoneRef}
            label="- 빼고 숫자만 입력해주세요"
            variant="outlined"
          />
        </Box>
        {!phoneText && phone.length > 0 && (
          <Box sx={ErrorText}>전화번호 형식이 일치하지 않습니다.</Box>
        )}
        <Box>
          <TextField
            sx={FormInputEmail}
            className={`${email && "focused"}`}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setEmail(event.target.value);
              emailValueCheck(event.target.value);
            }}
            value={email}
            ref={emailRef}
            label="이메일을 입력해주세요"
            variant="outlined"
          />
        </Box>
        {!emailText && email.length > 0 && (
          <Box sx={ErrorText}>이메일 형식이 일치하지 않습니다.</Box>
        )}
        <CButton
          onClick={validationCheck}
          large
          type="blue"
          style={{ mt: "30px", height: "45px" }}
        >
          회원가입
        </CButton>
      </Box>
      {
        <CAlert
          open={alert !== ""}
          onClose={() => {
            setAlert("");
            switch (alertStatus) {
              case "joinSuccess":
                navigate(`/login`);
                return false;
              case "joinFailed":
                navigate(`/join`);
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
export default JoinPage;
