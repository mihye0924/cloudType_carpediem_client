import { Box, keyframes, styled } from "@mui/material"

const CLoading = () => {
  return (
    <Box sx={Container}>
      <Box sx={LoaderWrap}>
        <Loader />
      </Box>
    </Box>
  )
}

export default CLoading


const Container = {
  position: 'relative',
  width: '100%',
  height: '100vh',
  
}
const LoaderWrap = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
}

const Loader = styled('span')(({theme}) => ({
  width: '48px',
  height: '48px',
  border: `1px solid ${theme.palette.text.default}`,
  borderBottomColor: 'transparent',
  borderRadius: '50%',
  display: 'inline-block',
  position: 'relative',
  boxSizing: 'border-box',
  
  animation: `${rotation} 1s linear infinite`,
  '&:after': {
    content: "''",
    position: 'absolute',
    boxSizing: 'border-box',
    left: '20px',
    top: '31px',
    border: '10px solid transparent',
    borderRightColor: theme.palette.text.default,
    transForm: 'rotate(-40deg)'
  }
}))

const rotation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`
