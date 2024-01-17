 
import { Box, IconButton, List, ListItem, ListItemButton, TextField, TextareaAutosize, styled } from "@mui/material"
import CButton from "../../CButton"  
import { InsertLink, PersonAddAlt, Verified } from "@mui/icons-material"
import { useLocation } from "react-router"
import { useRecoilValue } from "recoil"
import { userState } from "@/recoil/atoms/userState" 
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react"
import axios from "axios" 
import CModal from "@/components/CModal"

const profileDefault = {
  user_id: "",
  account_profile: "/assets/images/profile-dummy.svg",
  account_name: "",
  account_no: 0,
  account_info: "",
  account_link: "",
  account_list_num: 0,
  account_followers: 0,
  account_following: 0,
  account_badge: 0
}
interface profileType {
  user_id: string;
  account_profile: string;
  account_name: string;
  account_no: number;
  account_info: string;
  account_link: string;
  account_list_num: number;
  account_followers: number;
  account_following: number;
  account_badge: number;
} 

const CMain = () => {
  const user = useRecoilValue(userState)
  const path = useLocation().pathname.split('/')[1]
  const [profile, setProfile] = useState<profileType>(profileDefault)   
  const [profileEdit, setProfileEdit] = useState(false)
  const [name, setName] = useState('');
  const nameRef = useRef<HTMLInputElement>(null)

  // 데이터 가져오기
  const postData = useCallback(async() => {  
    console.log(path,"path")
    await axios({
      method: 'get', 
      url: `http://localhost:8081/list/profile/${path}` 
    })
    .then(( res ) => { 
      if(res.data.code === 200) {
        setProfile(res.data.result[0])
      }else{
        setProfile(profileDefault)
      }
    })
    .catch((err) => console.log(err))
  },[path])

  const handleAccountLink = (url: string) => {   
    window.location.href = `https://${url}`
  }

  useEffect(()=>{   
    postData() 
  },[postData])

  return (
    <Section>
      {
        user.isAuth ?
        <Box sx={Container}> 
          <Box sx={ProfileImg}> 
            <Box sx={{ display: 'flex', flexDirection: 'column'}}>
              <Box sx={ProfileImgBox}>
                <img src={
                  profile?.account_profile ?
                  `/assets/uploads/profile/${profile?.account_profile}`:
                  "/assets/images/profile-dummy.svg"
                  }
                alt="profile" />
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px', }}> 
                <Name>{path}</Name>
                {
                  profile?.account_badge > 0 &&
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
                    <p>{profile?.account_list_num}</p>
                    <p>게시물</p>
                  </ListItemButton> 
                </ListItem> 
                <ListItem> 
                  <ListItemButton 
                    disableRipple
                    sx={{ flexDirection: 'column', padding:0 }} 
                    onClick={() => console.log('팔로워')}
                  > 
                    <p>{profile?.account_followers}</p>
                    <p>팔로워</p>
                  </ListItemButton> 
                </ListItem> 
                <ListItem> 
                  <ListItemButton 
                  disableRipple
                    sx={{ flexDirection: 'column', padding:0 }} 
                    onClick={() => console.log('팔로잉')}
                  >  
                    <p>{profile?.account_following}</p>
                    <p>팔로잉</p>
                  </ListItemButton> 
                </ListItem> 
              </List>
            </Box>
          </Box>
          <Box sx={ProfileText}>
            <P>{profile?.account_info}</P> 
            {
              profile?.account_link &&
              <Box>
                <InsertLink />
                <CButton onClick={() => handleAccountLink(profile?.account_link)}>
                  {profile?.account_link}
                </CButton> 
              </Box>
            }
          </Box>
          <Box sx={ProfileBtn}>
            <CButton 
              type="lightgray" 
              style={{ flex: 1, whiteSpace: 'pre', height: '35px' }}
              onClick={() => setProfileEdit(!profileEdit)}
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
              <img src={profile?.account_profile} alt="profile" />
            </Box>
          </Box> 
          <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1}}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}> 
              <Name>{path}</Name>
              {
                profile?.account_badge > 0 &&
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
          <P>{profile?.account_info}</P> 
          {
            profile?.account_link &&
            <Box>
              <InsertLink />
              <CButton onClick={() => handleAccountLink(profile?.account_link)}>
                {profile?.account_link}
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
          onClose={() => { setProfileEdit(!profileEdit)}}
          open={true}  
        >
          <Box sx={EditRow1}>
          <img src={ 
            "/assets/images/profile-dummy.svg"
            }
          alt="profile" />
            <Box sx={{display: 'flex', flexDirection: 'column'}} >
              <TextField  
              variant="outlined"
                sx={FormInputId} 
                className={`${name && 'focused'}`}
                onChange={
                  (event: ChangeEvent<HTMLInputElement>) => { setName(event.target.value) }}
                value={name}
                ref={nameRef} 
              />
              <CButton medium type="blueBorder">프로필사진 바꾸기</CButton>
            </Box>
          </Box>
          <Box sx={EditRow2}>
          <p>웹사이트</p>
          <TextField  
          variant="outlined"
            sx={FormInputId} 
            className={`${name && 'focused'}`}
            onChange={
              (event: ChangeEvent<HTMLInputElement>) => { setName(event.target.value) }}
            value={name}
            ref={nameRef}
            placeholder="웹사이트를 입력해주세요."
          />
          </Box>
          <Box sx={EditRow2}>
            <p>소개</p>
            <TextareaAutosize   
              aria-label="empty textarea" placeholder="소개글을 입력해주세요."
            />
          </Box>
          <Box sx={EditRow2}>
            <CButton large type="blue">제출</CButton>
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
  margin: '20px 0 10px 0',
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
      fontSize: '18px',
      transform: 'rotate(-45deg)'
    }
  }
}  
const P = styled('p')(({theme}) => ({ 
    fontWeight: '500',
    color: theme.palette.text.default
})) 


const modalStyle = {   
  '&.MuiBox-root': {
    textAlign: 'center',
    backgroundColor: '#fff',
    'section:first-child': {
      borderBottom: '1px solid #f1f1f1',
      '& p': {
        width: '100%',
        textAlign: 'center',
      }
    },
    'section:last-child': { 
      flexDirection: 'column',
      '& svg': { 
        fontSize: '60px',
        marginBottom: '20px'
      },
    }
  },
  '.MuiSvgIcon-root': {
   color: '#393939'
  },
} 


const FormInputId = { 
  width: '195px',   
  backgroundColor: '#fff', 
  'input': {
    fontSize: '12px',
    border: '1px solid #f1f1f1',
    padding: '10px',
    borderRadius: '5px',
    color: '#393939',
    '&:focus': {
      outline: '1px solid #2d4b97', 
    },
    '&:hover': {
      outline: '1px solid #2d4b97', 
    }
  }, 
  '& .Mui-focused fieldset': {
    borderColor: 'form.input',
    borderWidth: '1px !important'
  },
}
const EditRow1 = {
  padding: '0 10px',
  width: '100%',
  maxWidth: '300px',
  display: 'flex',
  justifyContent: 'space-between',
  gap: '10px',
  '& img': {
    width: '70px',
    height: 'auto'
  },
  '& button': {
    marginTop: '10px',
    width: '120px',
    height: '25px', 
    fontSize: '12px',
    '&:hover': {
      backgroundColor: 'transparent'
    }
  }
}
const EditRow2 = {
  padding: '0 10px',
  width: '100%',
  maxWidth: '300px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '10px',
  marginTop: '20px',
  'p': {
    fontSize: '12px'
  },
  'textarea': {
    width: '195px',
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
      outline: '1px solid #2d4b97', 
    }
  }
}