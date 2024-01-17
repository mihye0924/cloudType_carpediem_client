
import { Box, Modal, styled } from '@mui/material'; 
import { Close, ArrowBackIosNew } from '@mui/icons-material'; 


interface ModalProps {
  title?: string;
  children: JSX.Element | JSX.Element[] ;
  onClose?: () => void;
  onClick?: () => void;
  onPrev?: () => void;
  open: boolean;
  icon?: string;
  style?: object;
  darkMode? : boolean;
}
 
const CModal = (props: ModalProps) => {  
  return (  
    <Modal open={props.open} onClose={props.onClose}> 
      <Box sx={{ 
          ...props.style,
          width: '100%', 
          height:'100%', 
          backgroundColor: props.darkMode ? 'background.default' : '',
          '&:focus': {
            outline: 'none',
          }
         }}> 
        <Section1>
          {
            props.icon === "prev" &&
            <ArrowBackIosNew 
              sx={{ color: 'text.default', fontSize: '18px' }}
              onClick={props.onPrev}
            />
          }
          <p>{props.title}</p>
          {
            props.icon === "close" &&
            <Close 
              sx={{ color: 'text.default'}}
              onClick={props.onClose}
            />
          }
        </Section1> 
        <Section2>{props.children}</Section2>  
      </Box>
    </Modal> 
  )
}

export default CModal;


const Section1 = styled('section')(() => ({
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px',
    height: '50px', 
    alignItems: 'center', 
    'p': {
      fontWeight: 'bold',
    }
})) 
const Section2 = styled('section')(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  maxWidth: '975px',
  margin: '0 auto',
  height: 'calc( 100vh - 50px )'
})) 