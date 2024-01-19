import CButton from "@/components/CButton" 
import { profileType } from "@/type/mainType"
import { HomeOutlined, AddBoxOutlined, BookmarkBorderOutlined, EmailOutlined } from "@mui/icons-material"
import { Box, styled } from "@mui/material"   

interface propsType {
  setStep: React.Dispatch<React.SetStateAction<number>>
  setModal: React.Dispatch<React.SetStateAction<boolean>> 
  profile: profileType
  modal: boolean 
}


const CMainFooter = (props: propsType) => { 
  return (
    <Section>
      <Box sx={FooterWrap}>
        <Box sx={FooterIconWrap}>
          <CButton><HomeOutlined /></CButton>
          <CButton 
            onClick={() => {
              
              props.setModal(!props.modal)
              props.setStep(1)
            }}
          ><AddBoxOutlined /></CButton>
          <CButton>
            <Box>
              <img src={
                props.profile.account_profile === "profile-dummy.svg" ?
                `/assets/images/${props.profile.account_profile}` :
                `${import.meta.env.VITE_BACK_URL}/uploads/profile/${props.profile.account_profile}`
              }
              alt="profile" />
            </Box>
          </CButton>
          <CButton>
            <BookmarkBorderOutlined />
          </CButton>
          <CButton>
            <EmailOutlined />
          </CButton>
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
  'button': {
    minWidth: '30px',
    width: '30px',
    height: '30px',
    overflow: 'hidden',
    padding: 0,
    color: '#000',
    '&:hover': {
      backgroundColor: 'transparent',
    },
    'div': { 
      width: '25px',
      height: '25px',
      overflow: 'hidden',
      borderRadius:'50%'
    },
    'img': {
      width: '25px'
    },
    'svg': {
      fontSize: '25px'
    }
  }
}