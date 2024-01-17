import { Box, Button, IconButton, List, styled } from "@mui/material"
import { useCallback, useEffect, useState } from "react" 
import { userState } from "@/recoil/atoms/userState"
import { useRecoilValue } from "recoil" 
import axios from "axios"
import { useLocation } from "react-router"   
import { AddAPhotoOutlined, FilterOutlined } from '@mui/icons-material';
import CModal from "@/components/CModal" 


const CMainImageList = () => {
  const [list, setList] = useState([]); 
  const user = useRecoilValue(userState);
  const [modal, setModal] = useState(false)
  const path = useLocation().pathname.split('/')[1];  
 

  const postData = useCallback(async() => {
    const data = { 
      account_name: path
    }
    await axios({
      method: 'get',
      url: 'http://localhost:8081/list', 
      headers: data
    })
    .then(( res ) => {
      if(res.data.code === 200) {   
        setList(res.data.result)  
        return false
      }else { 
        setList([])
        return false
      }
    })
    .catch((err) => console.log(err))
  },[path])

  const changeFile = () => {

  }
  useEffect(() => {  
    postData() 
  },[postData])

  return (
    <Section className={user.isAuth ? 'logged_in' : 'not_logged_in'}>
      {  
        list.length > 0 ?
        <List sx={ImageList}> 
          {
            list.map(() => ( 
              <p></p>  
            ))
          }
        </List>  
        :
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
          <Box>
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
                name="attachment" 
                type="file" 
                onChange={changeFile} 
              />  
            </Button>  
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
const ImageList = {
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
  },
  '& button': { 
    width: '100%',
    bgcolor: 'transparent', 
    paddingBottom: '100%',
  },
  '& img': {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: 'auto'
  }
}
// const NotFoundImage= styled('div')(() => ({ 
//   backgroundColor: '#fff',
//   height: '100%',
// }))

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
    'section:first-child': {
      borderBottom: '1px solid #f1f1f1',
      '& p': {
        width: '100%',
        textAlign: 'center',
      }
    },
    'section:last-child': { 
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

const CreateListButton = {
  width: '100%',
  '&:hover':{
    backgroundColor: '#162753',
  }, 
  backgroundColor: '#2d4b97',
  color: '#fff',
  margin: '30px 0 10px 0',
}