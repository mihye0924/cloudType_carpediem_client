import { DensityMedium, NotificationsNone, DarkMode, LightMode, ArrowBackIos } from '@mui/icons-material'; 
import { Box, IconButton, styled } from '@mui/material'; 
import { useRecoilState, useRecoilValue } from 'recoil';
import { modeState } from '@/recoil/atoms/modeState'; 
import { Link, useLocation } from 'react-router-dom';
import { userState } from '@/recoil/atoms/userState';


const CMainHeader = () => {   
  const [mode, setMode] = useRecoilState(modeState)  
  const user = useRecoilValue(userState)
  const path = useLocation().pathname.split('/')[1]
  
  const handleDarkMode = () => {
    setMode(mode === "light" ? "dark" : "light") 
  }


  return (
    <Header> 
      {
        user.isAuth ? 
        <Box sx={Container}> 
          <Logo><Link to="">CarpeDiem</Link></Logo>
          <Box>  
            <IconButton  
              disableRipple
              sx={DarkLightIcon} 
              aria-label="darkLight" 
              onClick={handleDarkMode}
            >
              {mode === "dark" ? <LightMode /> : <DarkMode />}
            </IconButton>
            <IconButton 
              disableRipple
              sx={AlarmIcon} 
              aria-label="alarm" 
              onClick={() => console.log('알림')}
            >
              <NotificationsNone sx={{fontSize: '25px'}} /> 
            </IconButton>
            <IconButton 
              disableRipple
              sx={MenuIcon} 
              aria-label="menu" 
              onClick={() => console.log('메뉴')}
            >
              <DensityMedium sx={{fontSize: '20px'}} /> 
            </IconButton> 
          </Box>
        </Box>
        :
        <Box sx={Container2}>
           <IconButton 
              disableRipple
              sx={AlarmIcon} 
              aria-label="alarm" 
              onClick={() => console.log('이전')}
            > 
              <ArrowBackIos sx={{fontSize: '16px'}}  />
            </IconButton>
          <NickName>{path}</NickName>
          <IconButton  
            disableRipple
            sx={DarkLightIcon} 
            aria-label="darkLight" 
            onClick={handleDarkMode}
          >
            {mode === "dark" ? <LightMode /> : <DarkMode />}
          </IconButton>
        </Box>
      }
    </Header>
  )
}

export default CMainHeader

const Header = styled('header')(({theme}) => ({
  borderBottom: theme.palette.background.underline
}))  
const Container = { 
  display: 'flex',
  justifyContent: 'space-between',
  padding: '8px 10px',
  width: '100%',
  maxWidth:'975px', 
  margin: '0 auto',
} 
const Logo = styled('h1')(({theme}) => ({
  display: 'inline-block',
  height: '35px',
  lineHeight: '35px',
  'a': {
    color: theme.palette.text.main, 
    fontSize: '18px', 
    textAlign: 'center',
    fontFamily: 'Sonsie One !important',
    marginBottom: '30px',
  }
})) 
const DarkLightIcon = {
  padding: 0,
  margin:'5px',
  color: 'text.default',
  '&:hover': {
    bgcolor: 'transparent'
  }
}  
const AlarmIcon = {
  padding: 0,
  margin:'5px',
  color: 'text.default',
  '&:hover': {
    bgcolor: 'transparent'
  }
} 
const MenuIcon = {
  padding: 0,
  margin:'5px 0 5px 5px',
  color: 'text.default',
  '&:hover': {
    bgcolor: 'transparent'
  }
}

const Container2 = {  
  display: 'flex',
  justifyContent: 'space-between',
  padding: '8px 10px',
  width: '100%',
  maxWidth:'975px', 
  margin: '0 auto',
} 
const NickName = styled('h1')(({theme}) => ({
  height: '35px',
  lineHeight: '35px', 
  color: theme.palette.text.default, 
  fontSize: '14px', 
  fontWeight: 500,
})) 