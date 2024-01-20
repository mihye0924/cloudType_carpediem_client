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
import { Box, Button, TextField, TextareaAutosize, styled } from "@mui/material"
import { FilterOutlined } from "@mui/icons-material"
import { userState } from "@/recoil/atoms/userState"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import CButton from "@/components/CButton"
import { profileModalStatus, WriteModalStatus } from "@/recoil/atoms/modalStatus"
import { profileStatus } from "@/recoil/atoms/profileStatus"
import { listStatus } from "@/recoil/atoms/listState"

const MainPage = () => { 
  const path = useLocation().pathname.split('/')[1];  
  const navigate = useNavigate();
  
  const nameRef = useRef<HTMLInputElement>(null);
  const websiteRef = useRef<HTMLInputElement>(null);
  const introRef = useRef<HTMLTextAreaElement>(null);  
  const contentRef = useRef<HTMLTextAreaElement>(null);  

  const [imgSavePath, setImgSavePath] = useState("profile-dummy.svg"); // 프로필 이미지 기본값
  const [isLoading, setIsLoading] = useState<boolean>(true);  //로딩
  const user = useRecoilValue(userState); // 내 회원정보
  const [write, setWrite] = useRecoilState(WriteModalStatus) // 글쓰기
  const [imgSlideList, setImgSlideList] = useState([]) // 글쓰기 이미지
  const [content, setContent] = useState("");  // 글쓰기 텍스트
  const [edit, setEdit] = useRecoilState(profileModalStatus); // 프로필 편집
  const [profile, setProfile] = useRecoilState(profileStatus) // 프로필 데이터
  const [imgIs, setImgIs] = useState(false); // 프로필 이미지 변경 유무
  const [name, setName] = useState("") // 프로필 이름
  const [website, setWebsite] = useState(""); // 프로필 웹사이트
  const [intro, setIntro] = useState("");  // 프로필 소개
  const setList = useSetRecoilState(listStatus) // 리스트 데이터
 

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
      }
    })
    .catch((err) => console.log(err))
  },[path, setProfile])
 
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
    }
   })
   .catch((err) => console.log(err))
 },[path, setList]) 

  // 글쓰기 작성하기
  const handleCreateSubmit = useCallback(async() => {
    const data = {
      account_name : path,
      list_image: JSON.stringify(imgSlideList),
      list_content: content
    }
    await axios({
      method: 'post',
      url: `${import.meta.env.VITE_BACK_URL}/list/create`,
      data: data,   
      withCredentials: true
    })
    .then((res) => {
      console.log(res.data.code,"res.data.code")
      if(res.data.code === 200) {
        alert('게시물 등록이 완료되었습니다.')
        setWrite((prev) => { 
          return {
             ...prev, 
              modal: false 
        }})
        return navigate(`/${path}`) 
      }else{
        alert('게시물 등록이 실패하였습니다.')
        setWrite((prev) => { 
          return {
             ...prev, 
              step: 1 
        }})
        return navigate(`/${path}`) 
      }
    })
    .catch(err => console.log(err))
  },[content, imgSlideList, navigate, path, setWrite])
   
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
        alert('문구를 입력해주세요')
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
        alert('프로필 변경에 성공하였습니다.');
        setEdit(!edit)
        return navigate(`/${name}`)
      } else {
        alert('프로필 변경에 실패하였습니다.')
        return setEdit(!edit)
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
  },[getListData, getProfileImgData, path, profile.account_info, profile.account_link, profile.account_name])
 

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
    </>
  )
}

export default MainPage

// 게시글 추가
const modalStyle = {   
  '&.MuiBox-root': {
    textAlign: 'center',
    backgroundColor: '#fff',
    width: '100%',
    maxWidth: '580px',
    maxHeight: '840px',
    position: 'relative',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    'section': {
      '&:first-of-type': {
        borderBottom: '1px solid #f1f1f1', 
        '& p': {
          fontSize: '14px',
          position: 'absolute',
          transform: 'translate(-50%, -50%)',
          top: '50%',
          left: '50%', 
        }
      },
      '&:last-of-type': {  
        position: 'relative',
        maxHeight: 'calc( 840px - 50px )', 
        display: 'block',
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
const CreateListButton = {
  width: '100%',
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
  transform: 'translate(-50%,-50%)'
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
const ContentBox = styled('div')(() => ({   
  padding: '10px',
  height: 'calc(100% - 50%)',
  border: '1px solid #f1f1f1',
  overflowY: 'auto',
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
  'p': {
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