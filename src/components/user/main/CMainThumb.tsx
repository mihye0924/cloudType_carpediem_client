import { Box, IconButton, styled } from "@mui/material"
import CButton from "@/components/CButton"
import { MoreHoriz, FavoriteBorder, TurnedInNot, ChatBubbleOutline } from '@mui/icons-material';

// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { useCallback, useEffect, useState } from "react"; 
import axios from "axios";
import { useLocation } from "react-router"; 
import { listType } from "@/recoil/atoms/listState";
import { useRecoilValue } from "recoil";
import { userState } from "@/recoil/atoms/userState";

const CMainThumb = () => { 
  const path = useLocation().pathname;  
  const [list, setList] = useState([]) // 리스트 데이터
  const user = useRecoilValue(userState); // 내 회원정보

  // 리스트 데이터 가져오기
  const getListData = useCallback(async() => { 
    await axios({
      method: 'get', 
      url: `${import.meta.env.VITE_BACK_URL}/list/${path.split('/')[1]}`, 
      withCredentials: true
    })
    .then(( res ) => {   
    if(res.data.code === 200) {  
      setList(res.data.result)
    }
    })
    .catch((err) => console.log(err))
  },[path, setList])  
  
  //  리스트 순서 바꾸기
  const moveItemToTop = useCallback(() => {
    const index = list.findIndex((item: listType) => item.list_no === Number(path.split('/')[2]));
    
    if(index !== -1) {
      const selectedItem = list.splice(index, 1)[0]; // 해당 배열을 찾아서 지우고
      list.unshift(selectedItem) //맨 앞으로 밀어 넣는다.
    }
  },[list, path])

  
  useEffect(() => { 
    getListData()   
  },[getListData])

  return (
    <Section>
      {
        list.map((item : listType) => { 
          moveItemToTop()
          return (
           <Box key={item.list_no}>
            <ThumbBox>
              <CButton onClick={() => console.log('프로필보기')}>
                <img src="/assets/images/profile-dummy.svg" alt="프로필"/>
                <p>{path.split('/')[1]}</p>
              </CButton>
              <Box>
                {
                  !user.isAuth && <CButton
                  style={FollowButton} 
                  type="lightgray" 
                  onClick={() => console.log('팔로우')}
                >
                  팔로우
                </CButton>
                }
                <IconButton 
                  disableRipple
                  sx={MenuIcon}  
                  aria-label="menu" 
                  onClick={() => console.log('메뉴')}
                > 
                  <MoreHoriz sx={{fontSize: '28px'}} />
                </IconButton>
              </Box>
            </ThumbBox>
            <SwiperBox> 
              <Swiper
                // install Swiper modules
                  modules={[Navigation, Pagination, Scrollbar, A11y]} 
                  slidesPerView={1}  
                  pagination = {{
                    el: '.swiper-pagination',
                    clickable: true,
                  }}
                >
                {
                  item.list_image.map((imgItem) => (
                    <SwiperSlide key={imgItem.id}>
                      <CButton onClick={() => console.log('이미지')}>
                        <img src={`${import.meta.env.VITE_BACK_URL}/uploads/list/${imgItem.img}`} alt=""/>
                      </CButton> 
                    </SwiperSlide> 
                  ))
                }
                <InnerBox> 
                  <div className="swiper-pagination"> 
                  </div>  
                  <Box sx={ThumbFuctionBox1}>  
                    <Box>
                      <IconButton 
                        disableRipple
                        sx={HeartIcon} 
                        aria-label="heart" 
                        onClick={() => console.log('하트')}
                      > 
                        <FavoriteBorder sx={{fontSize: '28px'}} />
                      </IconButton>
                      <IconButton 
                        disableRipple
                        sx={ReplyIcon}  
                        aria-label="reply" 
                        onClick={() => console.log('댓글')}
                      > 
                        <ChatBubbleOutline sx={{fontSize: '28px'}} />
                      </IconButton>
                    </Box>
                    <Box> 
                      <IconButton 
                        disableRipple
                        sx={CaptionIcon}  
                        aria-label="caption" 
                        onClick={() => console.log('북마크')}
                      > 
                        <TurnedInNot sx={{fontSize: '28px'}} />
                      </IconButton>
                    </Box>
                  </Box>
                  <Box sx={ThumbFuctionBox2}>
                    <CButton onClick={() => console.log('좋아요')}>좋아요 00 개</CButton>
                    <Box>
                      <CButton onClick={() => console.log('댓글')}>댓글 00개</CButton>
                      <CButton  onClick={() => console.log('모두보기')}>모두보기</CButton>
                    </Box>
                  </Box>
                </InnerBox>
                </Swiper>
            </SwiperBox> 
           </Box>
          )
        }) 
      }
    </Section>
  )
}

export default CMainThumb
const Section = styled('section')(() => ({  
  width: '100%',
  maxWidth:'975px', 
  margin: '0 auto', 
})) 
const ThumbBox = styled('div')(({theme}) => ({
  borderBottom: theme.palette.background.underline,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px',
  '>button': {
    padding: 0,
    minWidth: 'fit-content',
    'img': {
      width: '30px',
      height: '30px',
    },
    'p': {
      textTransform: 'lowercase',
      fontSize: '12px',
      marginLeft: '10px',
      color: theme.palette.text.default
    },
    '&:hover': {
      backgroundColor: 'transparent',
    }
  }
})) 
const FollowButton = {
  padding: '0 5px',
  minWidth: '55px',
  fontSize: '12px',
  lineHeight: 2
}
const MenuIcon = {
  padding: 0,
  marginLeft: '10px',
  '&:hover': {
    bgcolor: 'transparent'
  }
} 
const SwiperBox  = styled('div')(({theme}) => ({
  borderBottom: theme.palette.background.underline,
  '.swiper-slide': { 
    borderBottom: '1px solid #f1f1f1',
    'button': {
      position:'relative',
      overflow: 'hidden',
      width: '100%', 
      paddingBottom: '98%',
      '&:hover': {
        backgroundColor: 'transparent',
      },
      'img': {
        position:'absolute',
        width: '100%',
        height: 'auto',
        top:0,
        left:0
      }
    },
  },
  '.swiper-pagination-bullets': { 
    height: '0',
  },
  '.swiper-pagination-bullet': {
    backgroundColor: theme.palette.text.default,
    opactiy: 'var(--swiper-pagination-bullet-inactive-opacity, 1)',
  },
  '.swiper-pagination-bullet-active': {
    backgroundColor: '#2d4b97'
  }
}))  
const InnerBox = styled('div')(() => ({
  position:'relative',
  padding: '10px',
  '.swiper-pagination-bullets': {
    top: 'var(--swiper-pagination-top, 10px)'
  }
})) 
const ThumbFuctionBox1 = {
  display:'flex', 
  justifyContent:'space-between',
  alignItems: 'center',
  height:'25px'
} 
const ThumbFuctionBox2 = {
  margin:'10px 0',
  'button': { 
    minWidth: 'fit-content',
    padding:0,
    color:'text.default',
    '&:hover': {
      backgroundColor: 'transparent'
    }
  }

}
const HeartIcon = {
  padding: 0, 
  color: 'text.default',
  '&:hover': {
    bgcolor: 'transparent'
  }
}
const ReplyIcon = {
  padding: 0, 
  marginLeft: '10px',
  color: 'text.default' 
}
const CaptionIcon = {
  padding: 0, 
  color: 'text.default',
  '&:hover': {
    bgcolor: 'transparent'
  }
}