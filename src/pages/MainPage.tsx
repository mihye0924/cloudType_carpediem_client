import CMainHeader from "@/components/user/main/CMainHeader"
import CMain from '@/components/user/main/CMain'
import CMainImageList from '@/components/user/main/CMainImageList'
import CMainFooter from '@/components/user/main/CMainFooter'
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react"
import CLoading from "@/components/user/CLoading" 
import axios from "axios"  
import { DataType, profileData, profileType } from "@/type/mainType" 
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
import { Box, Button, TextareaAutosize, styled } from "@mui/material"
import { FilterOutlined } from "@mui/icons-material"
import { userState } from "@/recoil/atoms/userState"
import { useRecoilValue } from "recoil"

const MainPage = () => { 
  const [isLoading, setIsLoading] = useState<boolean>(true);  
  const [profile, setProfile] = useState<profileType>(profileData); 
  const [list, setList] = useState<DataType[]>([]); 
  const [imgSlideList, setImgSlideList] = useState([])
  const [content, setContent] = useState("");
  const [modal, setModal] = useState(false) 
  const [inputCont, setInputCont] = useState(0)
  const [step, setStep] = useState(1)  
  const path = useLocation().pathname.split('/')[1];  
  const navigate = useNavigate();
  const contentRef = useRef<HTMLTextAreaElement>(null);  
  const user = useRecoilValue(userState);
  

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
  },[path])
 
  // 리스트 가져오기
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
 },[path])
   

  // 글쓰기 스탭2. 이미지 가져오기
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
      setStep(2)
    })
    .catch((err) => console.log(err)) 
  },[]);
 
  // 글쓰기
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
        return navigate(`/${path}`) 
      }else{
        alert('게시물 등록이 실패하였습니다.')
        return navigate(`/${path}`) 
      }
    })
    .catch(err => console.log(err))
  },[content, imgSlideList, navigate, path])
 
  // 텍스트 길이 체크
  const handleTextArea = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const str =  event.target.value.replace(/[\0-\x7f]|([0-\u07ff]|(.))/g, "$&$1$2").length
    setContent(event.target.value)
    setInputCont(str)     
  }
 
  // 다음, 공유버튼 클릭
  const handleNext = (step: number) => { 
    if(step == 2) {
      setStep(3) 
    }else{
      handleCreateSubmit()
    }
  }


  useEffect(() => {   
    setIsLoading(false)
    getProfileImgData()
    getListData()   
  },[getListData, getProfileImgData])
 

  return (
    <>
    {
      !isLoading ? 
      <>
        <CMainHeader />
        <CMain 
          list={list} 
          profile={profile} 
          />
        <CMainImageList 
          modal={modal}
          setModal={setModal}
          setStep={setStep} 
          profile={profile} 
          list={list} 
        />
        {
          user.isAuth &&
          <CMainFooter
            modal={modal}
            setModal={setModal}
            setStep={setStep} 
            profile={profile} 
          />
        }
      </>
      :
      <>
        <CLoading />
      </>
    }
    {
      modal &&
      <CModal  
        icon={step === 1 ? "close": "prev"} 
        title="새 게시물 만들기"
        style={modalStyle}
        onClose={() => { setModal(!modal) }}
        open={true}  
        nextBtn={step === 1 ? false : true}
        onPrev={() => { step === 2 ? setStep(1) : setStep(2) }}
        onNext={() => {handleNext(step)}}
        nextTitle={ step === 2 ? '다음' : '공유하기'}
      >
        <>
          {
            step === 1 &&
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
            imgSlideList.length > 0 && step !== 1 && 
            <>
              <SwiperBox sx={{ 
                  maxHeight: step === 2 ? '100%' : '420px' ,
                  height: step === 2 ? '100%' : '50%'
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
                 
                step === 3 && 
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
                    onChange={handleTextArea}
                    maxLength={500} 
                  />
                  <span>{inputCont} / 500</span>
                </Box>
              </ContentBox>
              }
            </>
          } 
        </>
      </CModal>
    }
    </>
  )
}

export default MainPage

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