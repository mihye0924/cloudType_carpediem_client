import CModal from "@/components/modal";
import CButton from "@/components/button";
import { Box, TextField, styled } from "@mui/material";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import CAlert from "@/components/alert";

// page
const CLoginId = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneText, setPhoneText] = useState(false);
  const [checkNum, setCheckNum] = useState("");
  const [step, setStep] = useState(1);
  const [certificateNum, setCertificateNum] = useState(false);
  const [min, setMin] = useState(3);
  const [sec, setSec] = useState(0);
  const [id, setId] = useState("");
  const navigate = useNavigate();
  const [alert, setAlert] = useState("");

  const time = useRef<number>(180);
  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const checkNumRef = useRef<HTMLInputElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // 타이머 텍스트
  const handleTimerNum = () => {
    return (min > 0 ? Math.floor(min) : "0") + ":" + (min > 0 ? sec : "0");
  };

  // 타이머 설정
  const timerStart = useCallback(() => {
    intervalRef.current = setInterval(() => {
      setMin(Number(time.current) / 60);
      setSec(Number(time.current) % 60);
      Number((time.current -= 1));
    }, 1000);
  }, []);

  // 아이디, 전화번호 유효성체크
  const validationCheck = () => {
    if (name === "") {
      (nameRef.current?.children[1].children[0] as HTMLElement).focus();
      setAlert("이름을 입력해주세요");
      return false;
    }
    if (phone === "") {
      (phoneRef.current?.children[1].children[0] as HTMLElement).focus();
      setAlert("전화번호를 입력해주세요");
      return false;
    }
    idCheckSubmit();
  };

  // 인증번호 유효성 체크
  const validationCheck2 = () => {
    if (checkNum === "") {
      (checkNumRef.current?.children[1].children[0] as HTMLElement).focus();
      setAlert("인증번호 6자리를 입력해주세요.");
      return false;
    }
    handleCertificateNumberCheck();
  };

  // 전화번호 유효성 검사
  const phoneValueCheck = (str: string) => {
    const phoneRegex = /^(01[016789]{1})[0-9]{4}[0-9]{4}$/.test(str);
    setPhoneText(phoneRegex);
  };

  // 로그인 아이디 찾기
  const idCheckSubmit = useCallback(async () => {
    const data = {
      user_name: name,
      user_phone: phone,
    };

    await axios({
      method: "POST",
      url: `${import.meta.env.VITE_BACK_URL}/user/idFind`,
      headers: { "Content-Type": "application/json" },
      data: data,
      withCredentials: true,
    })
      .then((res) => {
        if (res.data.code === 200) {
          setAlert(
            "인증번호가 발송되었습니다. 3분안에 인증번호를 입력해 주세요."
          );
          setCertificateNum(!certificateNum);
          timerStart();
        } else {
          setAlert("가입시 입력하신 회원정보가 맞는지 다시 한번 확인해주세요.");
          return false;
        }
      })
      .catch((err) => console.log(err));
  }, [certificateNum, name, phone, timerStart]);

  // 인증번호 체크
  const handleCertificateNumberCheck = useCallback(async () => {
    const data = {
      user_name: name,
      certificateNum: checkNum,
    };
    await axios({
      method: "POST",
      url: `${import.meta.env.VITE_BACK_URL}/user/idCertificate`,
      headers: { "Content-Type": "application/json" },
      data: data,
      withCredentials: true,
    })
      .then((res) => {
        if (res.data.code === 200 && intervalRef.current !== null) {
          setAlert("인증이 완료되었습니다.");
          setId(res.data.result);
          clearInterval(intervalRef.current);
          setMin(3);
          setSec(0);
          time.current = 180;
          setStep(2);
          setCertificateNum(!certificateNum);
          return false;
        } else {
          setAlert("인증이 실패하였습니다.");
          return setCertificateNum(!certificateNum);
        }
      })
      .catch((err) => console.log(err));
  }, [certificateNum, checkNum, name]);

  useEffect(() => {
    if (min === 0 && sec === 0 && intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      setMin(3);
      setSec(0);
      setAlert("시간이 초과되었습니다.");
      time.current = 180;
      setCertificateNum(!certificateNum);
    }
  }, [certificateNum, min, sec, time]);

  return (
    <CModal
      icon="close"
      onClose={() => {
        navigate("/login");
      }}
      open={true}
      style={modalStyle}
    >
      <Box sx={Container}>
        <H1>CarpeDiem</H1>
        {step === 1 && (
          <>
            <Box sx={InputInner}>
              <TextField
                sx={FormInputId}
                className={`${name && "focused"}`}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  setName(event.target.value);
                }}
                ref={nameRef}
                value={name}
                disabled={certificateNum ? true : false}
                label="이름을 입력해주세요"
                variant="outlined"
              />
            </Box>
            {!certificateNum ? (
              <>
                <Box>
                  <TextField
                    sx={FormInputPhone}
                    className={`${phone && "focused"}`}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                      setPhone(event.target.value);
                      phoneValueCheck(event.target.value);
                    }}
                    ref={phoneRef}
                    value={phone}
                    label="- 빼고 숫자만 입력해주세요"
                    variant="outlined"
                  />
                </Box>
                {!phoneText && phone.length > 0 && (
                  <Box sx={ErrorText}>전화번호를 정확하게 입력해주세요.</Box>
                )}
                <CButton
                  large
                  type="blue"
                  style={{ padding: "10px 0", mt: "10px", height: "45px" }}
                  onClick={validationCheck}
                >
                  인증번호 받기
                </CButton>
              </>
            ) : (
              <>
                <Box sx={InputInner2}>
                  <Box sx={{ position: "relative", width: "100%" }}>
                    <TextField
                      sx={FormInputId}
                      className={`${checkNum && "focused"}`}
                      onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        setCheckNum(event.target.value);
                      }}
                      value={checkNum}
                      ref={checkNumRef}
                      label="인증번호 6자리를 입력해주세요."
                      variant="outlined"
                    />
                    <CertifiCateNumBox>{handleTimerNum()}</CertifiCateNumBox>
                  </Box>
                  {/* <CButton small type='blue'
                  style={{ height: '42px', whiteSpace: 'pre' }}  
                  onClick={}
                  >
                    재발송
                  </CButton> */}
                </Box>
                <CButton
                  large
                  type="blue"
                  style={{ padding: "10px 0", mt: "10px", height: "45px" }}
                  onClick={validationCheck2}
                >
                  확인
                </CButton>
              </>
            )}
          </>
        )}
        {step === 2 && (
          <Box>
            <Box sx={IdBox}>
              회원님의 아이디는
              <IdText>{id}</IdText>입니다.
            </Box>
            <CButton large type="blue" onClick={() => navigate("/login")}>
              로그인으로 돌아가기
            </CButton>
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
      </Box>
    </CModal>
  );
};
export default CLoginId;

// style
const Container = {
  width: "480px",
  maxWidth: "100%",
  margin: "0 auto",
  padding: "0 10px",
};
const H1 = styled("h1")(({ theme }) => ({
  color: theme.palette.text.main,
  fontSize: "32px",
  textAlign: "center",
  fontFamily: "Sonsie One !important",
  marginBottom: "30px",
}));
const InputInner = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
};
const FormInputId = {
  width: "100%",
  marginBottom: "10px",
  div: {
    height: "45px",
  },
  label: {
    fontSize: "12px",
    color: "text.main",
    top: "-2px",
  },
  input: {
    fontSize: "12px",
  },
  "& label.Mui-focused": {
    color: "text.main",
    transform: "translate(22px, -2px) scale(0.75)",
  },
  "& .Mui-focused fieldset": {
    borderColor: "form.input",
  },
  "&.focused label": {
    transform: "translate(22px, -2px) scale(0.75)",
  },
};
const FormInputPhone = {
  width: "100%",
  marginBottom: "10px",
  div: {
    height: "45px",
  },
  label: {
    fontSize: "12px",
    color: "text.main",
    top: "-2px",
  },
  input: {
    fontSize: "12px",
  },
  "& label.Mui-focused": {
    color: "text.main",
    transform: "translate(22px, -2px) scale(0.75)",
  },
  "& .Mui-focused fieldset": {
    borderColor: "form.input",
  },
  "&.focused label": {
    transform: "translate(22px, -2px) scale(0.75)",
  },
};
const InputInner2 = {
  display: "flex",
  justifyContent: "space-between",
  gap: "10px",
};
const CertifiCateNumBox = styled("span")(() => ({
  position: "absolute",
  right: "20px",
  top: "15px",
  color: "red",
  fontWeight: "500",
}));

const modalStyle = {
  "&.MuiBox-root": {
    backgroundColor: "#fff",
  },
};
const ErrorText = {
  color: "red",
  fontSize: "12px",
  fontWeight: "500",
  marginBottom: "10px",
};

const IdBox = {
  fontWeight: "600",
  margin: "25px 0",
  textAlign: "center",
  fontSize: "20px",
  border: "1px solid #f1f1f1",
  padding: "40px 0",
  borderRadius: "5px",
};

const IdText = styled("span")(() => ({
  display: "block",
  margin: "20px 0",
  fontSize: "24px !important",
}));
