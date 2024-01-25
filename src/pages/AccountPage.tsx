import CAlert from "@/components/CAlert"
import CButton from "@/components/CButton"
import CModal from "@/components/CModal"
import CLoading from "@/components/user/CLoading"  
import { userState } from "@/recoil/atoms/userState"
import { DeleteOutline } from "@mui/icons-material"
import { Box, List,  ListItem, TextField, styled, Button } from "@mui/material"
import axios from "axios"
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react"  
import { useNavigate } from "react-router" 
import { useRecoilState } from "recoil"

interface accountType { 
    user_id: "",
    account_no: 0,
    account_name: "",
    account_profile: "",
    account_info: "",
    account_link: "" 
}


const AccountPage = () => {  
  const [user, setUser] = useRecoilState(userState)
  const navigate = useNavigate() 
  const [result, setResult] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [step, setStep] = useState(0)
  const [imgIs, setImgIs] = useState(false); 
  const [imgSavePath, setImgSavePath] = useState("profile-dummy.svg")
  const [name, setName] = useState('');
  const nameRef = useRef<HTMLInputElement>(null)
  const [alert, setAlert] = useState("")
  const [alertStatus, setAlertStatus] = useState("") 
  const [deleteAlertConfirm, setDeleteAlertConfirm] = useState(false)
  const [deleteAccount, setDeleteAccount] = useState("")

  // 데이터 가져오기
  const postData = useCallback(async() => { 
    await axios({
      method: "get",
      url: `${import.meta.env.VITE_BACK_URL}/account/${user.user_id}`, 
      withCredentials: true 
    })
    .then(( res ) => {
      if(res.data.code === 200) {
        setResult(res.data.result)  
        return false
      }else {
        setResult([])
        return false
      }
    })
    .catch((err) => console.log(err))
  },[user.user_id])
  
  // 프로필 설정
  const handleNextStep = (num: number) => {
    // 유효성 검사
    switch(num) {
      case 1: 
        return setStep(num)
      case 2:
        if(name === "") {
          setAlert('닉네임을 입력해주세요.') 
          setAlertStatus("")
        }else if(name !== null){  
          const isEngExp = EngExp(name); 
          if(isEngExp) { 
            return handleNickNameCheck(); 
          }else{
            setAlert('영문으로만 입력해주세요') 
            setAlertStatus("")
          } 
        }  
    }
  }

  // 영문, 특수기호, 숫자 유효성 검사
  const EngExp = (str: string) => { 
    return /^[a-z0-9_-]{1,15}$/.test(str)
  }
  
  // 프로필 이미지 업로드
  const handleUpLoadProfile = useCallback(async(e: ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData()  
    const file = e.target.files?.[0];
    if(!file) return; 
    formData.append('profile', file);  
    
    await axios({
      method:'post',
      url:`${import.meta.env.VITE_BACK_URL}/account/upload`, 
      headers: { 'Content-Type': 'multipart/form-data' },  
      withCredentials: true,
      data: formData
    })
    .then((res) => {
      console.log(res,"res")
      if(res.data.success) {  
        setImgSavePath(res.data.imagePath)
        setTimeout(() => {
          setImgIs(true)
        }, 100);
      }
    })
    .catch((err) => console.log(err)) 
  },[setImgIs, setImgSavePath]);
  
  // 닉네임 사용여부
  const handleNickNameCheck = useCallback(async() => {  
    await axios({
      method: 'get',
      url:`${import.meta.env.VITE_BACK_URL}/account/checkName/${name}`, 
      withCredentials: true 
    })
    .then((res) => {  
      if(res.data.code === 200) {
        setAlert('사용 가능한 닉네임입니다.')
        setAlertStatus("possible") 
      }else{
        setAlert('사용 불가능한 닉네임입니다.')
        setAlertStatus("impossible") 
      }
    })
    .catch((err) => console.log(err))
  },[name]) 

  // 계정 생성하기
  const handleCreateAccount = useCallback(async() => { 
    const data = {
      user_id: user.user_id,
      account_name: name,
      account_profile: imgSavePath
    } 
    await axios({
      method: 'post',
      url: `${import.meta.env.VITE_BACK_URL}/account/create`,
      data: data, 
      withCredentials: true
    })
    .then((res) => {
      if(res.data.code === 200) {
        setAlert('계정이 생성되었습니다.')
        setAlertStatus("create")  
        setUser((prev) => {
          return{ 
            ...prev,
            account_name: name,  
          }
        })
      }else{
        setAlert('계정 생성이 실패하였습니다.')
        setAlertStatus("faiiled")  
      }
    })
    .catch((err) => console.log(err))
  },[imgSavePath, name, setUser, user.user_id]) 

  // 계정 삭제하기
  const handleDelete = async() => {
    console.log(deleteAccount,"ddd") 
    const data = {
      user_id: user.user_id,
      account_name: deleteAccount
    } 
    await axios({
      method: 'delete',
      url: `${import.meta.env.VITE_BACK_URL}/account/delete`,
      data: data, 
      withCredentials: true
    })
    .then((res) => {
      if(res.data.code === 200) {
        setAlert('계정이 삭제되었습니다.');
        setAlertStatus("delete")
        setUser((prev) => {
          return{ 
            ...prev,
            account_name: "",  
          }
        })
      }else{ 
        setAlert('계정 삭제를 실패하였습니다.');
        navigate(`/${user.user_id}/account`)
      }
    })
    .catch(err => console.log(err)) 
  }
  // 계정 삭제 확인창
  const handleDeleteAccount = useCallback(async(nickName: string) => { 
    setDeleteAlertConfirm(!deleteAlertConfirm)  
    setDeleteAccount(nickName)
  },[deleteAlertConfirm])


  const handleAccountLogin = (name: string) => {
    setUser((prev) => {
      return{ 
        ...prev,
        account_name: name,  
      }
    }) 
    navigate(`/${name}`)
  }
  
  useEffect(() => {   
    postData() 
    setIsLoading(false) 
  },[postData])

  return (
    <Container>
      <Section>
      {
        !isLoading || step === 0 ?
          <Box sx={AccountWrap}>
            <Logo>CarpeDiem</Logo>
            {
              result.length > 0 ?
              <List className={ result.length < 1 ? 'no_height':''}> 
              {
                result.map((item: accountType) => {
                  return(
                  <ListItem key={item.account_no}> 
                    <CButton onClick={() => handleAccountLogin(item.account_name)}>  
                      <Box>
                        <img src={
                          `${item.account_profile}` === "profile-dummy.svg" ? 
                          `/assets/images/${item.account_profile}` :
                          `${import.meta.env.VITE_BACK_URL}/uploads/profile/${item.account_profile}`
                          } alt="프로필 이미지"/> 
                      </Box>
                      <span>
                        {item.account_name} 
                      </span>
                    </CButton>
                    <CButton 
                      style={DeleteBtn} 
                      onClick={() => handleDeleteAccount(item.account_name)}
                    >
                      <DeleteOutline />
                    </CButton>
                  </ListItem>
                  )
                })
              }
              </List>
              :
              <NotResultListFound>
                계정이 없습니다.
              </NotResultListFound>
            }
            <CButton 
              type="blue"
              large 
              style={AccountCreate}
              onClick={() => handleNextStep(1)}
            >
              새 계정 만들기
            </CButton>
          </Box>  
        :
        <CLoading />
      }
      {
        step === 1 &&
        <CModal  
          icon="prev"
          onClick={() => navigate('/')} 
          onPrev={() => { setStep(0) }}
          open={true}
          style={CreateModal}

        >
          <h1>닉네임 입력</h1>
          <p>친구들이 회원님을 찾을 수 있도록 닉네임을 추가하세요.</p>
          <TextField  
          variant="outlined"
            sx={FormInputId} 
            className={`${name && 'focused'}`}
            onChange={
              (event: ChangeEvent<HTMLInputElement>) => { setName(event.target.value) }}
            value={name}
            ref={nameRef}
            placeholder="닉네임을 입력해주세요."
          />
          <CButton large type="blue" style={NextBtn} onClick={() => handleNextStep(2)}>다음</CButton>
        </CModal>
      }
      {
        step === 2 &&
        <CModal
          icon="prev"
          onClick={() => navigate('/')} 
          onPrev={() => {setStep(1)}}
          open={true}
          style={CreateModal} 
        >
         <>
          <h1>기본 프로필 변경</h1>
          <p>친구들이 회원님의 프로필을 볼 수 있게 설정하세요.</p> 
          <Box sx={ProfileImage}>
            <img src={
              !imgIs ?
               "/assets/images/profile-dummy.svg": 
              `${import.meta.env.VITE_BACK_URL}/uploads/profile/${imgSavePath}`} alt="profile"
              /> 
          </Box>   
          {
            !imgIs ? 
            <>
              <Button 
                sx={ProfileButton}
                component="label" 
                disableRipple 
              > 
                지금 변경하기
                <input 
                  hidden  
                  name="profile" 
                  type="file" 
                  onChange={handleUpLoadProfile}
                />  
              </Button>  
              <CButton 
                large 
                type="blueBorder" 
                style={{height: '45px'}} 
                onClick={handleCreateAccount}
              >
                나중에 변경하기
              </CButton>
            </>
            : 
            <CButton 
              large 
              type="blue" 
              style={{height: '45px', mt:'30px' }} 
              onClick={handleCreateAccount}
            >
              계정 생성하기
            </CButton> 
          }
          </>
        </CModal>
      }
      {
        <CAlert
          open={deleteAlertConfirm}
          onYesButton={handleDelete}
          onNoButton={() => setDeleteAlertConfirm(!deleteAlertConfirm)} 
        >
          <>계정을 삭제하시겠습니까?</>
        </CAlert>
      }
      { 
        <CAlert
          open={alert !== ""} 
          onClose={() => {  
            setAlert("")
            switch(alertStatus) {
              case "possible":
                setStep(2)
                return false
              case "impossible":
                setStep(1)
                return false
              case "create":
                navigate(`/${name}`)
                return false
              case "failed":
                navigate(`/`)
                return false
                case "delete": 
                navigate(`/${user.user_id}/account`)
                window.location.reload();
                return false 
              default:
                return false
            }
          }} 
        >
          <>
          {alert}
          </>
        </CAlert>
      }
      </Section>
    </Container>
  )
}

export default AccountPage

// 스타일  
const Container = styled('div')(() => ({ 
  backgroundColor: '#ebf1ff'
}))
const Section = styled('section')(() => ({
  position: 'relative',
  width: '480px',
  height: '100vh',
  maxWidth: '100%',
  margin: '0 auto',
  padding: '0 10px', 
})) 
const Logo = styled('h1')(() => ({ 
    color: "#2d4b97", 
    fontSize: '30px', 
    textAlign: 'center',
    fontFamily: 'Sonsie One !important',
    marginBottom: '30px' 
})) 
const AccountWrap = { 
  position: 'absolute',
  padding: '0 10px',
  width: '100%',
  top:'50%',
  left: '50%',
  transform: 'translate(-50%,-50%)',
  'ul' : {
    position: 'relative',
    overflowY: 'auto',
    minHeight: '200px',
    height: '50vh',
    padding: 0,
    '&::-webkit-scrollbar':{
      width: '10px',
      backgroundColor: '#f1f1f1'
    },
    '&::-webkit-scrollbar-thumb':{
      width: '10px',
      backgroundColor: '#2d4b97', 
      backgroundClip: 'padding-box',
      border: '2px solid transparent',
      borderRadius: '30px'
    },
    '&.no_height':{
      minHeight: '0',
      height:'0'
    }
  },
  'li': {
    backgroundColor: '#fff',
    borderRadius: '10px',
    overflow: 'hidden',  
    padding: '20px',
    border: '1px solid #f1f1f1'
  },
  'li:not(:last-child)': {
    marginBottom: '10px'
  },
  'button': {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap:'10px',
    padding: 0,
    '&:hover':{
      backgroundColor: 'transparent',
    },
    'div': { 
      width: '50px',
      height: '50px',
      overflow: 'hidden',
      borderRadius: '50%',
      'img': {
        width: '100%',
      }
    },
    'span': {
      textTransform: 'lowercase',
      fontWeight: '500',
      fontSize: '14px'
    }
  },
} 
const AccountCreate = {
  padding: '10px !important',
  justifyContent: 'center !important',
  marginTop: '30px',
  fontSize: '12px',
  '&.MuiButton-root': {
    '&:hover':{
      backgroundColor: '#162753',
    }
  }
}
const FormInputId = { 
  width: '100%',  
  marginTop: '20px',
  backgroundColor: '#fff',
  'div': { 
    height: '45px'
  },
  'input': {
    fontSize: '12px',
    color: '#393939'
  }, 
  '& .Mui-focused fieldset': {
    borderColor: 'form.input',
    borderWidth: '1px !important'
  },
}
 
const CreateModal = {  
  '&.MuiBox-root': {
    textAlign: 'center',
    backgroundColor: 'background.default',
    width: '100%',
    maxWidth: '580px',
    maxHeight: '840px',
    position: 'relative',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
   },
   '.MuiSvgIcon-root': {
    color: '#2d4b97'
   },
  'section': {
    '&:first-of-type': {
      'svg': {
        color: 'text.default'
      }
    },
    '&:nth-of-type(2)': { 
      flexDirection: 'column',
      maxHeight: 'calc( 840px - 50px )',  
      lineHeight: '1.5',
      padding: '0 20px', 
      alignItems: 'baseline',
      justifyContent: 'flex-start', 
    'h1': {
      fontWeight: '500',
      color: 'text.default',
      fontSize: '20px',
      marginTop: '10px',
      marginBottom: '5px'
    },
    '& p': {
      color: 'text.default',
      marginTop: '10px',
      fontSize: '14px', 
    }
  }
  }
}
const NextBtn = {
  marginTop: '10px' 
}
const ProfileImage = {   
  border: '1px solid #f1f1f1',
  width: '65%',
  paddingTop: '65%', 
  overflow: 'hidden',
  position: 'relative',
  borderRadius: '50%',
  margin: '50px auto 0 auto',
  'img': {  
    objectPosition: 'top',
    objectFit: 'cover', 
    width: '100%',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  }
}
const ProfileButton = { 
  width: '100%',
  height: '45px',
  '&:hover':{
    backgroundColor: '#162753',
  }, 
  backgroundColor: '#2d4b97',
  color: '#fff',
  margin: '30px 0 10px 0',
} 
const DeleteBtn = {
  '&.MuiButton-root': {
    width: '0',
  },
  minWidth: '30px',  
  'svg': { 
    color: '#2d4b97'
  }
}

const NotResultListFound = styled('div')(() => ({ 
  backgroundColor: '#fff',
  borderRadius: '8px',  
  textAlign: 'center',
  fontWeight: 900,
  fontSize: '12px',
  height: '200px',
  lineHeight: '200px',
  border: '1px solid #f1f1f1'
})) 