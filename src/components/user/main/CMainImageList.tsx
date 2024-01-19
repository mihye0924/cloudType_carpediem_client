import { Box, IconButton, styled } from "@mui/material" 
import { AddAPhotoOutlined } from '@mui/icons-material'; 
import { DataType, profileType } from "@/type/mainType";
import { Link } from "react-router-dom";
import { userState } from "@/recoil/atoms/userState";
import { useRecoilValue } from "recoil";

 
interface propsType {
  setStep: React.Dispatch<React.SetStateAction<number>>
  setModal: React.Dispatch<React.SetStateAction<boolean>>
  list: DataType[]  
  profile: profileType
  modal: boolean 
}

const CMainImageList = (props: propsType) => {   
  const user = useRecoilValue(userState);
 
  return (
    <Section className={
      `
      ${ !user.isAuth ? 'not_login' : ''}
      ${ user.isAuth && props.profile.account_link ? 'height30':""}
      ${ user.isAuth && props.profile.account_info ? 'height30':""}
      ${ user.isAuth && props.profile.account_link && props.profile.account_info ? 'height40': ""}`
      }>
      {    
      
        props.list.length > 0 ? 
        <>
          <ListImage>
          {
            props.list.map((item) => (
              <li key={item.list_no}>
                <Link to={`/${item.account_name}/${item.list_no}`}>  
                  <img src={`${import.meta.env.VITE_BACK_URL}/uploads/list/${item.list_image[0].img}`} alt="이미지"/>
                </Link>
              </li>
            ))
          }
          </ListImage>
        </>
        :
        <NotFound> 
          <Box>
            <IconButton 
                disableRipple
                aria-label="menu" 
                onClick={() => {
                  props.setModal(!props.modal)
                  props.setStep(1)
                }}
              > 
              <AddAPhotoOutlined /> 
            </IconButton>
            <p>사진 공유</p>
            <span>사진을 공유하면 회원님의 프로필에 표시됩니다.</span>
          </Box>
        </NotFound>
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
  height: 'calc( 100vh - 273px )',
    '&.not_login': {  
      height: 'calc( 100vh - 268px )',
    },
    '&.height30': {
      height: 'calc( 100vh - 268px - 30px )',
    },
    '&.height40': {
      height: 'calc( 100vh - 268px - 50px )',
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
const ListImage = styled('ul')(() => ({ 
  position:'relative',
  display: 'flex',   
  flexWrap:'wrap',
  boxSizing: 'border-box', 
  padding: 0,
  gap: '10px',
  margin: '10px',
  '& li':{ 
    width: 'calc((100% - 20px)/3)', 
    padding: 0,
    overflow: 'hidden',
  },
  'a': {
    position: 'relative',
    display: 'inline-block', 
    width: '100%',
    backgroundColor: 'transparent', 
    paddingBottom: '100%',
  },
  '& img': {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: 'auto'
  }
}))
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
