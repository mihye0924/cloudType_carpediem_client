import { Box, Button, IconButton, styled } from "@mui/material"
import { ChangeEvent, useCallback, useEffect, useState } from "react" 
import { userState } from "@/recoil/atoms/userState"
import { useRecoilValue } from "recoil"  
import { AddAPhotoOutlined, FilterOutlined } from '@mui/icons-material';
import CModal from "@/components/CModal" 
import axios from "axios";

// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import CButton from "@/components/CButton";

const CMainImageList = () => { 
  const user = useRecoilValue(userState);
  const [modal, setModal] = useState(false) 
  const [imgSlideList, setImgSlideList] = useState([])
 
 
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
    })
    .catch((err) => console.log(err)) 
  },[]);

  useEffect(() => {   
  },[])

  return (
    <Section className={user.isAuth ? 'logged_in' : 'not_logged_in'}>
      {    
        <NotFound> 
          <Box>
            <IconButton 
                disableRipple
                aria-label="menu" 
                onClick={() => setModal(!modal)}
              > 
              <AddAPhotoOutlined /> 
            </IconButton>
            <p>사진 공유</p>
            <span>사진을 공유하면 회원님의 프로필에 표시됩니다.</span>
          </Box>
        </NotFound>
      }
      {
        modal &&
        <CModal  
          icon="close" 
          title="새 게시물 만들기"
          style={modalStyle}
          onClose={() => { setModal(!modal) }}
          open={true}  
        >
          <Box sx={{height: '100%'}}>
            {
              imgSlideList.length > 0 ? 
              <SwiperBox>
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
                <CButton style={buttonBox} small type="blueBorder">업로드하기</CButton>  
              </SwiperBox>
              :
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
          </Box>
        </CModal>
      }
    </Section>
  )
}

export default CMainImageList
 
const Section = styled('section')(() => ({ 
  width: '100%',
  overflowY: 'auto',
  maxWidth: '975px',
  margin: '0 auto',
    '&.logged_in': {
      height: 'calc( 100vh - 355px )',
    },
    '&.not_logged_in': { 
      height: 'calc( 100vh - 263px )',
    },
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
    }
}))
// const ImageList = {
//   position:'relative',
//   display: 'flex',   
//   flexWrap:'wrap',
//   boxSizing: 'border-box', 
//   padding: 0,
//   gap: '10px',
//   margin: '10px',
//   '& li':{ 
//     width: 'calc((100% - 20px)/3)', 
//     padding: 0,
//   },
//   '& button': { 
//     width: '100%',
//     bgcolor: 'transparent', 
//     paddingBottom: '100%',
//   },
//   '& img': {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     width: '100%',
//     height: 'auto'
//   }
// } 
const NotFound = styled('div')(() => ({ 
  backgroundColor: '#fff',
  height: '100%',  
  textAlign: 'center',
  fontWeight: 900,
  fontSize: '12px',  
  border: '1px solid #f1f1f1',
  position: 'relative',
  'div': {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)'
  },
  'button': {
    border: '1px solid #393939', 
    color: '#393939',
    marginBottom: '20px',
    padding: 20,
    'svg': {
      fontSize: '30px',
    }
  },
  'p':{
    fontSize: '24px',
    marginBottom: '20px'
  },
  'span': {
    lineHeight: 1.2,
  }
})) 

const modalStyle = {   
  '&.MuiBox-root': {
    textAlign: 'center',
    backgroundColor: '#fff',
    'section': {
      '&:first-of-type': {
        borderBottom: '1px solid #f1f1f1',
        '& p': {
          width: '100%',
          textAlign: 'center',
        }
      },
      '&:last-of-type': { 
        position: 'relative',
        display: 'inline-block',
        width: '100%', 
        '& svg': { 
          fontSize: '60px',
          marginBottom: '20px'
        },
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
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%,-50%)'
}

const SwiperBox  = styled('div')(({theme}) => ({  
  width: '100%',
  height: '100%', 
  '.swiper': {
    height: '100%', 
  },
  '.swiper-slide': {  
    'img': { 
      width: '100%',
      height: '100%', 
      objectFit: 'cover'
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
    backgroundColor: '#fff'
  }
}))  

const buttonBox = {
  position: 'absolute',
  bottom: '50px',
  transform: 'translateX(-50%)',
  height: '40px',
  fontSize: '12px',
  zIndex: '2',
  '&.MuiButton-root': {
    backgroundColor: 'rgb(0 0 0 / 23%)',
    color: '#fff',
    border: '1px solid #fff'
  }
}