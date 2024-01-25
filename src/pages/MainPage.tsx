import CMainHeader from "@/components/user/main/CMainHeader"
import CMain from '@/components/user/main/CMain'
import CMainImageList from '@/components/user/main/CMainImageList'
import CMainFooter from '@/components/user/main/CMainFooter'
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react"
import CLoading from "@/components/user/CLoading" 
import axios from "axios"   
import CModal from "@/components/CModal" 
import { useLocation, useNavigate } from "react-router"; 

// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';  
import { Box, Button, List, ListItem, ListItemButton, Stack, Switch, TextField, TextareaAutosize, styled } from "@mui/material"
import { FilterOutlined } from "@mui/icons-material"
import { userState } from "@/recoil/atoms/userState"
import { useRecoilState, useSetRecoilState } from "recoil"
import CButton from "@/components/CButton"
import { listModalStatus, menuDrawerStatus, profileModalStatus, writeModalStatus } from "@/recoil/atoms/modalStatus"
import { profileStatus } from "@/recoil/atoms/profileStatus"
import { listStatus } from "@/recoil/atoms/listState"
import CAlert from "@/components/CAlert"
import CMainThumb from "@/components/user/main/CMainThumb"
import CDrawer from '@/components/CDrawer'; 
import { modeState } from '@/recoil/atoms/modeState';  

const MainPage = () => { 
  const path = useLocation().pathname.split('/')[1];  
  const navigate = useNavigate();
  
  const nameRef = useRef<HTMLInputElement>(null);
  const websiteRef = useRef<HTMLInputElement>(null);
  const introRef = useRef<HTMLTextAreaElement>(null);  
  const contentRef = useRef<HTMLTextAreaElement>(null);  

  const [imgSavePath, setImgSavePath] = useState("profile-dummy.svg"); // 프로필 이미지 기본값
  const [isLoading, setIsLoading] = useState<boolean>(true);  //로딩
  const [user, sestUser] = useRecoilState(userState) //내 회원정보
  const [write, setWrite] = useRecoilState(writeModalStatus) // 글쓰기
  const [imgSlideList, setImgSlideList] = useState([]) // 글쓰기 이미지
  const [content, setContent] = useState("");  // 글쓰기 텍스트
  const [edit, setEdit] = useRecoilState(profileModalStatus); // 프로필 편집
  const [profile, setProfile] = useRecoilState(profileStatus) // 프로필 데이터
  const [imgIs, setImgIs] = useState(false); // 프로필 이미지 변경 유무
  const [name, setName] = useState("") // 프로필 이름
  const [website, setWebsite] = useState(""); // 프로필 웹사이트
  const [intro, setIntro] = useState("");  // 프로필 소개 
  const setList = useSetRecoilState(listStatus) // 리스트 데이터
  const [alert, setAlert] = useState("") 
  const [alertStatus, setAlertStatus] = useState("")
  const [listModal, setListModal] = useRecoilState(listModalStatus)
 
  const [mode, setMode] = useRecoilState(modeState)  
  const [checked, setChecked] = useState(false) 
  const [menu, setMenu] = useRecoilState(menuDrawerStatus)
  const [confirm, setConfirm] = useState(false)
 
  const handleSwitchChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked)
    setMode(mode === "light" ? "dark" : "light") 
    setMenu(!menu)
  },[menu, mode, setMenu, setMode])
  
 

  // 로그아웃
  const handleLogOut = async() => { 
    await axios({
      method: "post",
      url: `${import.meta.env.VITE_BACK_URL}/user/logout`, 
      withCredentials: true
    })
    .then((res) => {
      console.log(res,"res")
      if(res.data.code === 200) {
        sestUser({ 
          isAuth: false,
          user_id: "",
          role: res.data.role,
          token: "",
        }) 
      }
      navigate('/login')
    })
  }

  // 프로필 데이터 가져오기
  const getProfileImgData = useCallback(async() => {
    console.log('실행1')
    await axios({
      method: 'get', 
      url: `${import.meta.env.VITE_BACK_URL}/list/profile/${path}`, 
      withCredentials: true
    })
    .then(( res ) => { 
      if(res.data.code === 200) {    
        setProfile(res.data.result[0]); 
      }else{ 
        if(profile.account_name === "") {
          navigate('/notFound') 
        } 
      }
    })
    .catch((err) => console.log(err))
  },[navigate, path, profile.account_name, setProfile])
 
  // 리스트 데이터 가져오기
  const getListData = useCallback(async() => {
    console.log('실행2')
    await axios({
     method: 'get', 
     url: `${import.meta.env.VITE_BACK_URL}/list/${path}`, 
     withCredentials: true
   })
   .then(( res ) => {   
    if(res.data.code === 200) {  
      setList(res.data.result) 
    }else{
      setList([])
    }
   })
   .catch((err) => console.log(err))
 },[path, setList]) 


  // 글쓰기 작성하기
  const handleCreateSubmit = useCallback(async() => {
    const data = {
      account_name : path,
      list_image: JSON.stringify(imgSlideList),
      list_content: content, 
    }
    await axios({
      method: 'post',
      url: `${import.meta.env.VITE_BACK_URL}/list/create`,
      data: data,   
      withCredentials: true
    })
    .then((res) => { 
      if(res.data.code === 200) {  
        setAlert('게시물 등록이 완료되었습니다.') 
        setAlertStatus("writeSuccess")
      }else{
        setAlert('게시물 등록이 실패하였습니다.') 
        setAlertStatus("writeFailed")
      }
    })
    .catch(err => console.log(err))
  },[content, imgSlideList, path])
   
  // 글쓰기 이미지 가져오기
  const handleChangeFile = useCallback(async(e: ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData()  
    const file = e.target.files; 
    if(!file) return; 
    for(let i=0; i< file.length; i++) { 
      formData.append('list', file[i]); 
    }   

     await axios({
      method:'post',
      url:`${import.meta.env.VITE_BACK_URL}/list/upload`, 
      headers: { 'Content-Type': 'multipart/form-data' },  
      withCredentials: true,
      data: formData
    })
    .then((res) => {
      setImgSlideList(res.data.imagePath) 
      setWrite((prev) => {
        return{
          ...prev,
          step: 2 
        }
      }) 
    })
    .catch((err) => console.log(err)) 
  },[setWrite]);
 
  // 글쓰기 다음, 공유버튼 클릭
  const handleNext = (step: number) => { 
    if(step == 2) {
      setWrite((prev) => {
        return{
          ...prev,
          step: 3 
        }
      }) 
    }else{
      if(content === "") { 
        (contentRef.current as HTMLElement).focus()
        setAlert('문구를 입력해주세요')  
        return false
      }
      handleCreateSubmit()
    }
  }
 
 
  // 프로필 편집 이벤트
  const handleEditSubmit = async() => {
    const data = {
      account_profile: 
      imgSavePath === "profile-dummy.svg" ? profile.account_profile : imgSavePath, 
      account_info: intro,
      account_link: website,
      account_name: name
    }
    await axios({
      method: 'put',
      url: `${import.meta.env.VITE_BACK_URL}/account/edit`,
      data: data, 
      withCredentials: true 
    })
    .then((res) => {
      if(res.data.code === 200) {  
        setAlert('프로필 변경에 성공하였습니다.'); 
        setAlertStatus("editSuccess")

      } else { 
        setAlert('프로필 변경에 실패하였습니다.')  
        setAlertStatus("editFailed")
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

  useEffect(() => {   
    setIsLoading(false)
    getProfileImgData()
    getListData()    
    setName(profile.account_name)
    setWebsite(profile.account_link)
    setIntro(profile.account_info)  
  },[getListData, getProfileImgData, navigate, path, profile.account_info, profile.account_link, profile.account_name])
 

  return (
    <>
    {
      // 레이아웃
      !isLoading ? 
      <>
        <CMainHeader />
        <CMain />
        <CMainImageList/>
        {
          user.isAuth &&
          <CMainFooter />
        }
      </>
      : 
      <CLoading /> 
    }
    {
      // 글쓰기
      write.modal &&
      <CModal  
        icon={write.step === 1 ? "close": "prev"} 
        title="새 게시물 만들기"
        style={modalStyle}
        onClose={() => { 
          setWrite((prev) => {
            return{
              ...prev,
              modal: false 
            }
          }) 
        }}
        open={true}  
        nextBtn={write.step === 1 ? false : true}
        onPrev={() => { write.step === 2 ? 
          setWrite((prev => { return {...prev, step:1}})) : 
          setWrite((prev => { return {...prev, step:2}})) 
        }}
        onNext={() => {handleNext(write.step)}}
        nextTitle={ write.step === 2 ? '다음' : '공유하기'}
      >
        <>
          {
            write.step === 1 &&
            <Box sx={imgBox}>
              <FilterOutlined />
              <p>사진과 동영상을 여기에 끌어다 놓으세요</p>
              <Button 
                component="label" 
                disableRipple 
                style={CreateListButton}
              > 
                컴퓨터에서 선택
                <input 
                  hidden  
                  name="list" 
                  type="file" 
                  multiple 
                  onChange={handleChangeFile} 
                />  
              </Button>  
            </Box>
          }
          {
            imgSlideList.length > 0 && write.step !== 1 && 
            <>
              <SwiperBox sx={{ 
                  maxHeight: write.step === 2 ? '100%' : '420px' ,
                  height: write.step === 2 ? '100%' : '50%'
                }}>
                <Swiper 
                  modules={[Navigation, Pagination, Scrollbar, A11y]} 
                  slidesPerView={1}  
                  pagination = {{
                    el: '.swiper-pagination',
                    clickable: true,
                  }}
                  navigation ={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                  }}
                >
                {
                  imgSlideList.map((item: { img: string, id: number}) => {
                    return( 
                    <SwiperSlide key={item.id}> 
                      <img src={`${import.meta.env.VITE_BACK_URL}/uploads/list/${item.img}`} alt=""/> 
                    </SwiperSlide>
                    )
                  })
                }
                <Box > 
                  <div className="swiper-button-prev"></div>
                  <div className="swiper-button-next"></div>
                  <div className="swiper-pagination"></div>
                </Box>
                </Swiper> 
              </SwiperBox> 
              {
                 
                write.step === 3 && 
              <ContentBox> 
                <Box sx={profieImgBox}>
                  <Box>
                    <img src={
                      profile.account_profile === "profile-dummy.svg" ?
                      "/assets/images/profile-dummy.svg" :
                      `${import.meta.env.VITE_BACK_URL}/uploads/profile/${profile.account_profile}`}
                      alt="profile"/>
                  </Box>
                  <p>{path}</p>
                </Box>
                <Box sx={textAreaBox}>
                  <TextareaAutosize    
                    ref={contentRef} 
                    aria-label="empty textarea" placeholder="문구를 입력해주세요..."
                    value={content} 
                    onChange={(event: ChangeEvent<HTMLTextAreaElement>) => setContent(event.target.value)}
                    maxLength={500} 
                  />
                  <span>{content.length} / 500</span>
                </Box>
              </ContentBox>
              }
            </>
          } 
        </>
      </CModal>
    } 
    {
      // 프로필 편집
      edit &&
      <CModal 
        icon="close" 
        title="프로필 편집"
        style={modalStyle2}
        onClose={() => { setEdit(!edit) }}
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
          <Box sx={{display: 'flex', flexDirection: 'column', flex: 1}} >
            <TextField  
              variant="outlined"
              disabled
              sx={FormInputId} 
              className={`${name && 'focused'}`}
              onChange={
                (event: ChangeEvent<HTMLInputElement>) => { 
                  setName(event.target.value) 
                }}
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
            onChange={(event: ChangeEvent<HTMLTextAreaElement>) => setIntro(event.target.value)}
            maxLength={50}
          />
        </Box>
        <Box sx={EditRow2}>
          <p></p>
          <span>{intro.length} / 50</span>
        </Box>
        <Box sx={EditRow2}>
          <CButton large type="blue" onClick={handleEditSubmit}>제출</CButton>
        </Box>
      </CModal>
    }
    {
      // 알랏창
      alert !== "" && 
      <CAlert
        open={true} 
        onClose={() => {
          setAlert("")
          switch (alertStatus) {
            case "writeSuccess":
              navigate(`/${path}`) 
              setWrite((prev) => { 
                return {
                    ...prev, 
                    modal: false 
              }}) 
              return 
            case "writeFailed": 
              setWrite((prev) => { 
                return {
                    ...prev, 
                    step: 1 
              }}) 
              return 
            case "editSuccess":
              setEdit(!edit)
              navigate(`/${path}`) 
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
    {
        // 로그아웃 확인창
        confirm && 
        <CAlert 
          open={true} 
          onYesButton={handleLogOut}
          onNoButton={() => setConfirm(!confirm)}  
        >
          <>
            전체 계정에서 로그아웃됩니다, <br/> 그래도 로그아웃 하시겠습니까?
          </>
        </CAlert>
      } 
    { 
      // 게시물
      user.isAuth && listModal &&
      <CModal
        style={modalStyle3}
        icon="prev"
        title="게시물" 
        open={true}
        onPrev={() => {navigate(`/${path}`), setListModal(!listModal)}}
      >  
        <CMainThumb />  
      </CModal> 
    } 
    {   
    // 메뉴
      <CDrawer open={menu} onClose={() => setMenu(!menu)}> 
      <MenuSection>
          <h1>설정</h1>
          <BoxInner>
          <h2>계정</h2>
            <List>
              <ListItem>
                <ListItemButton 
                disableRipple 
                  onClick={() => setConfirm(!confirm)}
                >   
                  <p>로그아웃</p>
                </ListItemButton> 
            </ListItem>
            <ListItem>
                <ListItemButton 
                  disableRipple 
                  onClick={() => navigate(`/${user.user_id}/account`)}
                >   
                  <p>계정전환</p>
                </ListItemButton> 
            </ListItem> 
            </List>
          </BoxInner>
          <BoxInner>
          <h2>화면설정</h2>
            <List>
              <ListItem> 
                <p>나이트모드</p>
                <Stack direction="row" spacing={1} alignItems="center"> 
                  <AntSwitch 
                    checked={checked}
                    inputProps={{ 'aria-label': 'ant design' }} 
                    onChange={handleSwitchChange}
                  /> 
                </Stack>
              </ListItem> 
            </List>
          </BoxInner>
        </MenuSection>
      </CDrawer> 
      } 
    </>
  )
}

export default MainPage

// 게시글 추가
const modalStyle = {   
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
    'section': {
      '&:first-of-type': {
        '& p': {
          fontSize: '14px',
          position: 'absolute',
          transform: 'translate(-50%, -50%)',
          top: '50%',
          left: '50%',  
        },
        'svg': {
          color: 'text.default',
        }
      },
      '&:last-of-type': {  
        position: 'relative',
        maxHeight: 'calc( 840px - 50px )', 
        display: 'block',
        '& svg': { 
          fontSize: '60px',
          color: 'text.default',
          marginBottom: '20px'
        }
      }
    }, 
  },
  '.MuiSvgIcon-root': {
   color: '#393939'
  },
}  
const CreateListButton = {
  width: '35%',
  '&:hover':{
    backgroundColor: '#162753',
  }, 
  backgroundColor: '#2d4b97',
  color: '#fff',
  margin: '30px 0 10px 0',
} 
const imgBox = {
  width: '100%',
  padding: '0 10px',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%,-50%)',
  '& p': {
    color: 'text.default'
  }
} 
const SwiperBox = styled('div')(({theme}) => ({  
  width: '100%', 
  height: '100%',
  '.swiper': {
    height: '100%', 
  },
  '.swiper-slide': {  
    'img': { 
      width: '100%',
      height: '100%', 
      objectFit: 'contain'
    } 
  },
  '.swiper-button-prev': {
    backgroundColor: 'rgb(0 0 0 / 23%)',
    width: '45px',
    height: '45px',
    borderRadius: '50%',
    '&:after': {
      fontSize: '18px',
      fontWeight: '900',
      color:"#fff"
    }
  },
  '.swiper-button-next': {
    backgroundColor: 'rgb(0 0 0 / 23%)',
    width: '45px',
    height: '45px',
    borderRadius: '50%',
    '&:after': {
      fontSize: '18px',
      fontWeight: '900',
      color:"#fff"
    }
  },
  '.swiper-pagination-bullet': {
    backgroundColor: theme.palette.text.default,
    opactiy: 'var(--swiper-pagination-bullet-inactive-opacity, 1)',
  },
  '.swiper-pagination-bullet-active': {
    backgroundColor: '#2d4b97'
  }
}))   
const ContentBox = styled('div')(({theme}) => ({   
  padding: '10px',
  height: 'calc(100% - 50%)',
  borderTop: theme.palette.background.border,
  overflowY: 'auto',
  '&::-webkit-scrollbar':{
    width: '0',
  },
}))    
const profieImgBox = {
  display:'flex',
  gap:'10px',
  alignItems: 'center',
  'div': {
    display: 'inline-block',
    width:'35px',
    height: '35px',
    overflow: 'hidden',
    borderRadius:'50%',
  },
  'img': { 
    width:'100%',
    height: 'auto'
  },
  '& p': {
    color: 'text.default',
    fontWeight: '500',
    fontSize: '14px'
  }
} 
const textAreaBox = {
  marginTop: '10px',
  textAlign: 'right',
  'textarea': {
    width: '100%',
    padding: '5px',
    height: '305px !important',
    border: '1px solid #f1f1f1',
    borderRadius: '5px',
    '&:focus': {
      outline: '1px solid #000 !important',
    }
  },
  'span': {
    color: 'text.default',
    display: 'inline-block',
    marginTop: '5px',
    fontWeight: '500',
    fontSize: '12px'
  }
}


// 프로필 편집
const modalStyle2 = {   
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
    'section': {
      '&:first-of-type': { 
        '& p': {
          fontSize: '14px',
          position: 'absolute',
          transform: 'translate(-50%, -50%)',
          top: '50%',
          left: '50%', 
        },
        'svg': {
          color: 'text.default'
        }
      },
      '&:last-of-type': {  
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        maxHeight: 'calc( 840px - 50px )',  
        '& svg': { 
          fontSize: '60px',
          marginBottom: '20px'
        }
      }
    }, 
  },
  '.MuiSvgIcon-root': {
   color: '#393939'
  },
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
  '& .Mui-disabled': {
   textFillColor: '#393939 !important', 
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
    color: 'text.default',
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
  backgroundColor: '#fff',
  width: '120px',
  height: '25px', 
  fontSize: '12px', 
  color: '#2d4b97', 
  '&:hover': {
    backgroundColor: '#fff'
  }
}
 

// 게시물 
const modalStyle3 = { 
  '&.MuiBox-root': {
    textAlign: 'center',
    overflow: 'hidden',
    backgroundColor: 'background.default',
    width: '100%',
    maxWidth: '1280px',
    maxHeight: '840px',
    position: 'relative',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    'section': {
      '&:first-of-type': { 
        '& p': {
          fontSize: '14px',
          position: 'absolute',
          transform: 'translate(-50%, -50%)',
          top: '50%',
          left: '50%', 
        },
        'svg': {
          color: 'text.default'
        }
      },
      '&:last-of-type': {
        overflowY: 'auto',
        // position: 'relative',
        maxWidth: '100%',
        height: 'calc( 840px - 50px )', 
        maxHeight: 'calc( 100vh - 50px )',
        display: 'flex',
        '& svg': { 
          fontSize: '24px',
        },
        '&::-webkit-scrollbar':{
          width: '0', 
          overflow: 'hidden',
        },
      }
    }, 
  },
  '.MuiSvgIcon-root': {
   color: '#393939'
  },
}

// 메뉴 
const MenuSection = styled('div')(({theme}) => ({ 
  padding: '20px 10px',
  '& h1': {
    color: theme.palette.text.default,
    fontSize: '24px',
    fontWeight: '600',
    margin: '0 10px 0 10px',
  },
  '& h2': {
    color: theme.palette.text.default,
    fontSize: '14px',
    margin: '40px 10px 0 10px'
  },
  'ul': {
    paddingTop: '0',
    paddingBottom: '30px',
    '& li':{
      display: 'flex',
      justifyContent: 'space-between',
      padding: '25px 10px 0 10px',
      '> div': {
        padding: '0',
        'p': {
          color: theme.palette.text.default,
          fontWeight: 500,
          fontSize: '14px', 
        },
        '&:hover': {
          backgroundColor: 'transparent'
        }
      },
      'p': {
        color: theme.palette.text.default, 
        fontWeight: 500,
        fontSize: '14px', 
      },
    }
  }
}))  
const BoxInner = styled('div')(({theme}) => ({
  borderBottom: theme.palette.background.border 
}))  
const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 33,
  height: 20,
  padding: 0,
  display: 'flex',
  borderRadius: '25px',
  '&:active': {
    '& .MuiSwitch-thumb': {
      width: 15,
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
      transform: 'translateX(9px)',
    },
  },
  '& .MuiSwitch-switchBase': {
    padding: 4,
    '&.Mui-checked': {
      transform: 'translateX(12px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#2d4b97',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 
      theme.palette.mode === 'dark' ? '#fff' : '#fff',
    transition: theme.transitions.create(['width'], {
      duration: 200,
    }),
  },
}));
