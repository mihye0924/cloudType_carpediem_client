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
import { useEffect, useState } from "react";

const CMainThumb = () => {
  const [swiperList, setSwiperList] = useState([{
    id: 0,
    img: "https://place-hold.it/260x260"
  }])
  
  useEffect(() => {
    setSwiperList([
      ...swiperList,
      {
        id: 1,
        img: "https://place-hold.it/260x260"
      }
    ])
  },[])

  return (
    <Section>
      <ThumbBox>
        <CButton  onClick={() => console.log('프로필보기')}>
          <img src="/assets/images/profile-dummy.svg" alt="프로필"/>
          <p>cmh__0924</p>
        </CButton>
        <Box>
          <CButton 
            style={{ padding: '0 15px'}} 
            type="lightgray" 
            onClick={() => console.log('팔로우')}
          >
            팔로우
          </CButton>
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
          swiperList.map((item: { img: string, id: number}) => {
            return( 
            <SwiperSlide key={item.id}>
              <CButton onClick={() => console.log('이미지')}>
                <img src={item.img} alt=""/>
              </CButton>
            </SwiperSlide>
            )
          })
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
    'img': {
      width: '35px',
      height: '35px',
    },
    'p': {
      marginLeft: '10px',
      color: theme.palette.text.default
    },
    '&:hover': {
      backgroundColor: 'transparent',
    }
  }
})) 
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
    'button': {
      position:'relative',
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
  height:'40px'
} 
const ThumbFuctionBox2 = {
  margin:'10px 0',
  'button': { 
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