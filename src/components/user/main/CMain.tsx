 
import { Box, Button, IconButton, List, ListItem, ListItemButton, TextField, TextareaAutosize, styled } from "@mui/material"
import CButton from "../../CButton"  
import { InsertLink, PersonAddAlt, Verified } from "@mui/icons-material"
import { useLocation, useNavigate } from "react-router"
import { useRecoilValue } from "recoil"
import { userState } from "@/recoil/atoms/userState" 
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react"
import axios from "axios" 
import CModal from "@/components/CModal"       
import { DataType, profileType } from "@/type/mainType"

interface propsType {
  list: DataType[]  
  profile: profileType
}

const CMain = (props: propsType) => {
  const user = useRecoilValue(userState);
  const path = useLocation().pathname.split('/')[1];
  const [imgSavePath, setImgSavePath] = useState("profile-dummy.svg"); 
  const [profileEdit, setProfileEdit] = useState(false)
  const [imgIs, setImgIs] = useState(false);  
  const [name, setName] = useState("");
  const [website, setWebsite] = useState("");
  const [intro, setIntro] = useState("");
  const nameRef = useRef<HTMLInputElement>(null);
  const websiteRef = useRef<HTMLInputElement>(null);
  const introRef = useRef<HTMLTextAreaElement>(null); 
  const [inputCont, setInputCont] = useState(0);
  const navigate = useNavigate()

  //프로필 링크 클릭 
  const handleAccountLink = (url: string) => {   
    window.location.href = `https://${url}`
  }

  // 프로필 편집 이벤트
  const handleEditSubmit = async() => {
    const data = {
      account_profile: 
      imgSavePath === "profile-dummy.svg" ? props.profile.account_profile : imgSavePath, 
      account_info: intro,
      account_link: website,
      account_name: name
    }
    await axios({
      method: 'put',
      url: `${import.meta.env.VITE_BACK_URL}/account/edit`,
      data: data,
      headers: {"Context-Type" : "application/json"},  
      withCredentials: true 
    })
    .then((res) => {
      if(res.data.code === 200) {
        alert('프로필 변경에 성공하였습니다.');
        navigate(`/${name}`)
      } else {
        alert('프로필 변경에 실패하였습니다.')
        setProfileEdit(!profileEdit)
      } 
    })
    .catch((err) => console.log(err))
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
      if(res.data.success) {  
        setImgSavePath(res.data.imagePath)
        setTimeout(() => {
          setImgIs(true)
        }, 100);  
      }
    })
    .catch((err) => console.log(err)) 
  },[setImgSavePath]);

  // 텍스트 길이 체크
  const handleTextArea = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const str =  event.target.value.replace(/[\0-\x7f]|([0-\u07ff]|(.))/g, "$&$1$2").length
    setInputCont(str)  
    setIntro(event.target.value)
  }  

  useEffect(() => {
    if(props.profile) {
      setName(props.profile.account_name)
      setWebsite(props.profile.account_link)
      setIntro(props.profile.account_link)
    }
  },[props])

  return (
    <Section>
      {
        user.isAuth ?
        <Box sx={Container}> 
          <Box sx={ProfileImg}> 
            <Box sx={{ display: 'flex', flexDirection: 'column'}}>
              <Box sx={ProfileImgBox}>
                <img src={
                  props.profile.account_profile === "profile-dummy.svg" ?
                  `/assets/images/${props.profile.account_profile}` :
                  `${import.meta.env.VITE_BACK_URL}/uploads/profile/${props.profile.account_profile}`
                  }
                alt="profile" />
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px', }}> 
                <Name>{path}</Name>
                {
                 props.profile.account_badge > 0 &&
                  <Verified sx={{ fontSize: '16px', marginTop: '5px', color: 'text.main'}}/>
                }
              </Box>
            </Box>
            <Box>
              <List sx={ProfileList}>
                <ListItem> 
                  <ListItemButton
                    disableRipple 
                    sx={{ flexDirection: 'column', padding:0 }} 
                    onClick={() => console.log('게시물')}
                  > 
                    <p>{props.list.length}</p>
                    <p>게시물</p>
                  </ListItemButton> 
                </ListItem> 
                <ListItem> 
                  <ListItemButton 
                    disableRipple
                    sx={{ flexDirection: 'column', padding:0 }} 
                    onClick={() => console.log('팔로워')}
                  > 
                    <p>{props.profile.account_followers}</p>
                    <p>팔로워</p>
                  </ListItemButton> 
                </ListItem> 
                <ListItem> 
                  <ListItemButton 
                  disableRipple
                    sx={{ flexDirection: 'column', padding:0 }} 
                    onClick={() => console.log('팔로잉')}
                  >  
                    <p>{props.profile.account_following}</p>
                    <p>팔로잉</p>
                  </ListItemButton> 
                </ListItem> 
              </List>
            </Box>
          </Box>
          <Box sx={ProfileText}>
            <P>{props.profile.account_info}</P> 
            {
              props.profile.account_link &&
              <Box>
                <InsertLink />
                <CButton onClick={() => handleAccountLink(props.profile.account_link)}>
                  {props.profile.account_link}
                </CButton> 
              </Box>
            }
          </Box>
          <Box sx={ProfileBtn}>
            <CButton 
              type="lightgray" 
              style={{ flex: 1, whiteSpace: 'pre', height: '35px' }}
              onClick={() => {
                setProfileEdit(!profileEdit)
              } }
            >
              프로필편집
            </CButton> 
            <CButton 
              type="lightgray" 
              style={{ flex: 1, whiteSpace: 'pre', height: '35px' }}
              onClick={() => console.log('프로필공유')}
            >
              프로필공유
            </CButton>  
            <IconButton 
              disableRipple
              sx={PlusFriendsBtn} 
              aria-label="menu" 
              onClick={() => console.log('플러스친구')}
            > 
              <PersonAddAlt />
            </IconButton>
          </Box>
        </Box>
        :
        <Box sx={Container}> 
        <Box sx={ProfileImg}> 
          <Box sx={{display: 'flex', flexDirection: 'column', flex: 0 }}>
            <Box sx={ProfileImgBox}>
              <img src={
                  props.profile.account_profile === "profile-dummy.svg" ?
                  `/assets/images/${props.profile.account_profile}` :
                  `${import.meta.env.VITE_BACK_URL}/uploads/profile/${props.profile.account_profile}`
                  }
                alt="profile" />
            </Box>
          </Box> 
          <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1}}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}> 
              <Name>{path}</Name>
              {
                props.profile.account_badge > 0 &&
                <Verified sx={{ fontSize: '16px', marginTop: '5px', color: 'text.main'}}/>
              }
            </Box>
            <Box sx={ProfileBtn}>
              <CButton 
                type="blue" 
                style={{ flex: 1, whiteSpace: 'pre', height: '35px' }}
                onClick={() => console.log('팔로우')}
              >
                팔로우
              </CButton> 
              <CButton 
                type="lightgray" 
                style={{ flex: 1, whiteSpace: 'pre', height: '35px' }}
                onClick={() => console.log('메시지 보내기')}
              >
                메시지 보내기
              </CButton>  
              <IconButton 
                disableRipple
                sx={PlusFriendsBtn} 
                aria-label="menu" 
                onClick={() => console.log('플러스친구')}
              > 
                <PersonAddAlt />
              </IconButton>
            </Box>
          </Box>
        </Box>
        <Box sx={ProfileText}>
          <P>{props.profile.account_info}</P> 
          {
            props.profile.account_link &&
            <Box>
              <InsertLink />
              <CButton onClick={() => handleAccountLink(props.profile.account_link)}>
                {props.profile.account_link}
              </CButton> 
            </Box>
          }
        </Box>
      </Box>
      }
      {
        profileEdit &&
        <CModal 
          icon="close" 
          title="프로필 편집"
          style={modalStyle}
          onClose={() => { 
            setProfileEdit(!profileEdit) 
          }}
          open={true}  
        >
          <Box sx={EditRow1}>
            <Box sx={ProfileImgBox}>
             {
              imgIs ?
              <img src={
                imgSavePath === "profile-dummy.svg" ?
                "/assets/images/profile-dummy.svg":
                `${import.meta.env.VITE_BACK_URL}/uploads/profile/${imgSavePath}`
                }
              alt="profile"
              /> 
              :  
              <img src={
                props.profile.account_profile === "profile-dummy.svg" ?
                "/assets/images/profile-dummy.svg" :
                `${import.meta.env.VITE_BACK_URL}/uploads/profile/${props.profile.account_profile}`
                }
              alt="profile"
              /> 
             }
            </Box>
            <Box sx={{display: 'flex', flexDirection: 'column', flex: 1}} >
              <TextField  
                variant="outlined"
                disabled
                sx={FormInputId} 
                className={`${name && 'focused'}`}
                onChange={
                  (event: ChangeEvent<HTMLInputElement>) => { setName(event.target.value) }}
                value={name}
                ref={nameRef} 
              />
              <Button 
                sx={blueBtn}
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
            </Box>
          </Box>
          <Box sx={EditRow2}>
          <p>웹사이트</p>
          <TextField  
          variant="outlined"
            sx={FormInputId} 
            className={`${website && 'focused'}`}
            onChange={
              (event: ChangeEvent<HTMLInputElement>) => { setWebsite(event.target.value) }}
            value={website}
            ref={websiteRef}
            placeholder="웹사이트를 입력해주세요."
          />
          </Box>
          <Box sx={EditRow2}>
            <p>소개</p>
            <TextareaAutosize    
              ref={introRef} 
              aria-label="empty textarea" placeholder="소개글을 입력해주세요."
              value={intro} 
              onChange={handleTextArea}
              maxLength={50}
            />
          </Box>
          <Box sx={EditRow2}>
            <p></p>
            <span>{inputCont} / 50</span>
          </Box>
          <Box sx={EditRow2}>
            <CButton large type="blue" onClick={handleEditSubmit}>제출</CButton>
          </Box>
        </CModal>
      }
    </Section>
  )
}

export default CMain


const Section = styled('section')(({theme}) => ({
  borderBottom: theme.palette.background.underline
})) 
const Container = {
  width: '100%',
  maxWidth:'975px',
  padding: '10px',
  margin: '0 auto',

} 
const ProfileImg = {
   display: 'flex', 
   justifyContent: 'space-between', 
   gap: '15px',
   'span' : { 
    fontWeight: '400',
    letterSpacing: '-1px',
    marginTop: '15px',
    color: 'text.default'
   }
} 
const ProfileImgBox = {
  width: '80px',
  height: '80px',
  flexBasis: '80px',
  borderRadius: '50%',
  overflow: 'hidden',
  'img': {
    width: '100%',
  }
} 
const ProfileList = {
  display:'flex', 
  flexDirection: 'row',
  alignItems: 'center',
  '& li' : {
    padding: 0,
    marginRight: '25px',
  },
  '& div' : {
    bgcolor: 'transparent !important',
  },
  '& p:nth-of-type(1)' : {
    fontWeight: '400',
    color: 'text.default'
  },
  '& p:nth-of-type(2)' : {
    marginTop: '10px',
    fontWeight: '400',
    fontSize: '14px',
    whiteSpace: 'pre',
    color: 'text.default'
  }
} 
const ProfileBtn = { 
  display: 'flex', 
  justifyContent: 'space-between', 
  gap: '10px',
  mt: '20px',    
} 
const PlusFriendsBtn = { 
  flex: 0, 
  height: '35px',
  bgcolor: 'grayBtn.main',
  borderRadius: '5px',
  border: '2px solid transparent',
  boxSizing: 'box-sizing',
  '&:hover': {
    bgcolor: 'grayBtn.light',
    border: 2,
    borderColor: 'grayBtn.border',
    '& .MuiSvgIcon-root': {
      color: 'grayBtn.hoverText',
  }
  } 
}  
const Name = styled('span')(() => ({
  marginTop: '0 !important',
  marginRight: '5px'
}))  
const ProfileText = {
  margin: '10px 0 10px 0',
  'div': {
    marginTop: '10px',
    display: 'flex',
    'button': {
      width: 'auto',
      padding: 0,
      color: 'text.main',
      fontSize: '14px',
      height: '20px',
      textTransform: 'lowercase',
      '&:hover': {
        backgroundColor: 'transparent'
      }
    },
    'svg': {
      color: 'text.main',
      marginTop: '3px',
      fontSize: '18px',
      transform: 'rotate(-45deg)'
    }
  }
}  
const P = styled('p')(({theme}) => ({ 
    fontWeight: '500',
    color: theme.palette.text.default,
    fontSize: '14px'
})) 
 
const modalStyle = {   
  '&.MuiBox-root': {
    textAlign: 'center',
    backgroundColor: '#fff',
    'section': {
      '&:first-of-type' : {
        borderBottom: '1px solid #f1f1f1',
        '& p': {
          width: '100%',
          textAlign: 'center',
        }
      },
      '&:last-of-type': {
        flexDirection: 'column',
        '& svg': { 
          fontSize: '60px',
          marginBottom: '20px'
        },
      }
    }
  },
  '.MuiSvgIcon-root': {
   color: '#393939'
  },
}  

const FormInputId = {  
  backgroundColor: '#fff', 
  flex: 1,
  'input': { 
    fontSize: '12px',
    border: '1px solid #f1f1f1',
    padding: '10px',
    borderRadius: '5px',
    color: '#393939',
  }, 
  '& .Mui-focused fieldset': {
    borderColor: 'form.input',
    borderWidth: '1px !important'
  },
}
const EditRow1 = {
  padding: '0 10px',
  width: '100%', 
  display: 'flex',
  justifyContent: 'space-between',
  gap: '10px',
  '& img': {
    width: '80px',
    height: 'auto'
  }, 
}
const EditRow2 = {
  padding: '0 10px',
  width: '100%', 
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '10px',
  marginTop: '10px',
  '& p': {
    fontSize: '12px',
    flexBasis: '80px',
  },
  'textarea': { 
    flex: 1,
    height: '130px !important',
    border: '1px solid #c7c7c7', 
    borderRadius: '5px',
    padding: '10px',
    color: '#393939',
    fontWeight: '300',
    fontSize: '12px', 
    '&:focus': {
      outline: '1px solid #2d4b97', 
    },
    '&:hover': {
      outline: '1px solid #000', 
    }
  }
}

const blueBtn = {
  border: '1px solid #2d4b97', 
  marginTop: '10px',
  width: '120px',
  height: '25px', 
  fontSize: '12px', 
  color: '#2d4b97', 
  '&:hover': {
    backgroundColor: 'transparent'
  }
}