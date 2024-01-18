 
import { Box, Button, IconButton, List, ListItem, ListItemButton, TextField, TextareaAutosize, styled } from "@mui/material"
import CButton from "../../CButton"  
import { InsertLink, PersonAddAlt, Verified } from "@mui/icons-material"
import { useLocation, useNavigate } from "react-router"
import { useRecoilValue } from "recoil"
import { userState } from "@/recoil/atoms/userState" 
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react"
import axios from "axios" 
import CModal from "@/components/CModal"

const profileDefault = {
  user_id: "",
  account_profile: "profile-dummy.svg",
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
  const user = useRecoilValue(userState);
  const path = useLocation().pathname.split('/')[1];
  const [profile, setProfile] = useState<profileType>(profileDefault);
  const [imgSavePath, setImgSavePath] = useState("profile-dummy.svg"); 
  const [profileEdit, setProfileEdit] = useState(false)
  const [imgIs, setImgIs] = useState(false); 
  const [name, setName] = useState('');
  const [website, setWebsite] = useState('');
  const [intro, setIntro] = useState('');
  const nameRef = useRef<HTMLInputElement>(null);
  const websiteRef = useRef<HTMLInputElement>(null);
  const introRef = useRef<HTMLTextAreaElement>(null);
  const navigate = useNavigate()

  // 데이터 가져오기
  const postData = useCallback(async() => {   
    await axios({
      method: 'get', 
      url: `${import.meta.env.VITE_BACK_URL}/list/profile/${path}` 
    })
    .then(( res ) => { 
      // console.log(res.data.result[0],"res")
      if(res.data.code === 200) {
        setProfile(res.data.result[0])
        setName(res.data.result[0].account_name)
        setWebsite(res.data.result[0].account_link)
        setIntro(res.data.result[0].account_info)
      }else{
        setProfile(profileDefault)
      }
    })
    .catch((err) => console.log(err))
  },[path])
  
  //프로필 링크 클릭 
  const handleAccountLink = (url: string) => {   
    window.location.href = `https://${url}`
  }

  // 프로필 편집 이벤트
  const handleEditSubmit = async() => {
    const data = {
      account_profile: imgSavePath, 
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
      console.log(res,"res")
      if(res.data.success) {  
        setImgSavePath(res.data.imagePath)
        setTimeout(() => {
          setImgIs(true)
        }, 100);  
      }
    })
    .catch((err) => console.log(err)) 
  },[setImgSavePath]);

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
                  profile.account_profile === "profile-dummy.svg" ?
                  `/assets/images/${profile.account_profile}` :
                  `${import.meta.env.VITE_BACK_URL}/uploads/profile/${profile.account_profile}`
                  }
                alt="profile" />
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px', }}> 
                <Name>{path}</Name>
                {
                  profile.account_badge > 0 &&
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
                    <p>{profile.account_list_num}</p>
                    <p>게시물</p>
                  </ListItemButton> 
                </ListItem> 
                <ListItem> 
                  <ListItemButton 
                    disableRipple
                    sx={{ flexDirection: 'column', padding:0 }} 
                    onClick={() => console.log('팔로워')}
                  > 
                    <p>{profile.account_followers}</p>
                    <p>팔로워</p>
                  </ListItemButton> 
                </ListItem> 
                <ListItem> 
                  <ListItemButton 
                  disableRipple
                    sx={{ flexDirection: 'column', padding:0 }} 
                    onClick={() => console.log('팔로잉')}
                  >  
                    <p>{profile.account_following}</p>
                    <p>팔로잉</p>
                  </ListItemButton> 
                </ListItem> 
              </List>
            </Box>
          </Box>
          <Box sx={ProfileText}>
            <P>{profile.account_info}</P> 
            {
              profile.account_link &&
              <Box>
                <InsertLink />
                <CButton onClick={() => handleAccountLink(profile.account_link)}>
                  {profile.account_link}
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
                  profile.account_profile === "profile-dummy.svg" ?
                  `/assets/images/${profile.account_profile}` :
                  `${import.meta.env.VITE_BACK_URL}/uploads/profile/${profile.account_profile}`
                  }
                alt="profile" />
            </Box>
          </Box> 
          <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1}}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}> 
              <Name>{path}</Name>
              {
                profile.account_badge > 0 &&
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
          <P>{profile.account_info}</P> 
          {
            profile.account_link &&
            <Box>
              <InsertLink />
              <CButton onClick={() => handleAccountLink(profile.account_link)}>
                {profile.account_link}
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
                profile.account_profile === "profile-dummy.svg" ?
                "/assets/images/profile-dummy.svg" :
                `${import.meta.env.VITE_BACK_URL}/uploads/profile/${profile.account_profile}`
                }
              alt="profile"
              /> 
             }
            </Box>
            <Box sx={{display: 'flex', flexDirection: 'column'}} >
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
              onChange={ (event: ChangeEvent<HTMLTextAreaElement>)=> setIntro(event.target.value)}
            />
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
  width: '195px',   
  backgroundColor: '#fff', 
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
  maxWidth: '300px',
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