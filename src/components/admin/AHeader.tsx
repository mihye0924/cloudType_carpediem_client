import { Box, styled } from '@mui/material' 
import { Link, useLocation } from 'react-router-dom'
import CButton from '../CButton'

const AHeader = () => {
  const path = useLocation()
  const router = path.pathname 

  return (
    <Header>
      <Box sx={Container}> 
        <H1><Link to="">CarpeDiem</Link></H1>
        {
          router === "/admin" &&
          <>
            <CButton 
              style={{ padding: '0 20px'}} 
              type="lightgray"
              onClick={() => console.log('로그아웃')}
            >
              로그아웃
            </CButton>
          </>
        }
      </Box>
    </Header>
  )
}

export default AHeader

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
const H1 = styled('h1')(({theme}) => ({
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