import { HomeOutlined, AddBoxOutlined, BookmarkBorderOutlined, EmailOutlined } from "@mui/icons-material"
import { Box, styled } from "@mui/material" 
import { Link } from "react-router-dom"

const CMainFooter = () => {
  return (
    <Section>
      <Box sx={FooterWrap}>
        <Box sx={FooterIconWrap}>
          <Link to=""><HomeOutlined /></Link>
          <Link to=""><AddBoxOutlined /></Link>
          <Link to="">
            <img src="/assets/images/profile-dummy.svg" alt="프로필" />
          </Link>
          <Link to="">
            <BookmarkBorderOutlined />
          </Link>
          <Link to="">
            <EmailOutlined />
          </Link>
        </Box>
      </Box>
    </Section>
  )
}

export default CMainFooter

const Section = styled('section')(({theme}) => ({
  position: 'fixed',
  borderTop: theme.palette.background.underline,
  bottom: 0,
  width: '100%',
  backgroundColor: '#fff',
})) 

const FooterWrap = {
  width: '100%',
  maxWidth:'975px', 
  margin: '0 auto',
  'div': {
  }
}

const FooterIconWrap = {
  display: 'flex', 
  justifyContent:'space-between',
  alignItems: 'center',
  padding: '10px',
  'a': {
    'img': {
      width: '25px'
    },
    'svg': {
      fontSize: '25px'
    }
  }
}