import CModal from '@/components/CModal'   
import CButton from '@/components/CButton';
import { Box, TextField, styled } from '@mui/material';
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';  
 
// page
const CLoginId = () => {   
  const [id, setId] = useState('')
  const [phone, setPhone] = useState('') 
  const [checkNum, setCheckNum] = useState('000000') 
  const [certificateNum, setCertificateNum] = useState(false)
  const [min, setMin] = useState(3);
  const [sec, setSec] = useState(0)
  const time = useRef<number>(180)
  
  const timerStart = useCallback(() => {  
    setMin(Number(time.current) / 60)
    setSec(Number(time.current) % 60)
    Number(time.current -= 1)
  },[])
  
  useEffect(() => {
    const timer = setInterval(timerStart, 1000)  
    return () => {
      clearInterval(timer)
    }
  },[timerStart])
  

  return (
    <CModal  
      onClose={() => console.log('닫기')} 
      open={true}
    >  
      <Box sx={Container}>
        <H1>CarpeDiem</H1> 
        <Box sx={InputInner}>
          <TextField 
          sx={FormInputId}   
            className={`${id && 'focused'}`}
            onChange={
              (event: ChangeEvent<HTMLInputElement>) => { 
              setId(event.target.value)
            }}
            value={id}
            label="아이디를 입력해주세요" variant="outlined" 
          /> 
        </Box>
        {
          !certificateNum ?
          <> 
            <Box> 
              <TextField 
                sx={FormInputPhone} 
                className={`${phone && 'focused'}`}
                onChange={
                  (event: ChangeEvent<HTMLInputElement>) => { 
                  setPhone(event.target.value)
                }}
                value={phone}
                label="- 빼고 숫자만 입력해주세요" variant="outlined" 
              />     
            </Box>
            <CButton large type="blue" 
              style={{ padding: '10px 0', mt: '10px', height: '45px' }}
              onClick={() => setCertificateNum(!certificateNum)}
            >
              인증번호 받기
            </CButton>
          </>
          :
          <>
            <Box sx={InputInner2}>
              <Box sx={{ position:'relative', width: '100%' }}>
                <TextField 
                sx={FormInputId}   
                  className={`${ checkNum && 'focused'}`}
                  onChange={
                    (event: ChangeEvent<HTMLInputElement>) => { 
                    setCheckNum(event.target.value)
                  }}
                  value={checkNum}
                  label="인증번호 6자리를 입력해주세요." variant="outlined" 
                />
                <CertifiCateNumBox>
                  {min > 0 ? Math.floor(min) : '0'} : {min > 0 ? sec : '00'}
                </CertifiCateNumBox>
              </Box>
              <CButton small type='blue'
               style={{ height: '42px', whiteSpace: 'pre' }}  
              >
                재요청
              </CButton>
            </Box>
            <CButton large type="blue" 
              style={{ padding: '10px 0', mt: '10px', height: '45px' }}
              onClick={() => console.log('인증번호받기')}
            >
              확인
            </CButton>
          </>
        } 
      </Box>
    </CModal>
  )
}   
export default CLoginId
 

// style  
const Container = { 
  width: '480px',
  maxWidth: '100%',
  margin: '0 auto',
  padding: '0 10px' 
}
const H1 = styled('h1')(({ theme }) => ({
  color: theme.palette.text.main, 
  fontSize: '32px', 
  textAlign: 'center',
  fontFamily: 'Sonsie One !important',
  marginBottom: '30px'
})) 
const InputInner = { 
  display: 'flex',
  flexDirection: 'column',
  gap: '10px'
} 
const FormInputId = {
  width: '100%',
  marginBottom: '10px',
  'div': { 
    height: '45px'
  },
  'label': {
    fontSize: '12px',
    color: 'text.main',
    top: '-2px',  
  },
  'input': {
    fontSize: '12px'
  },
  '& label.Mui-focused': {
    color: 'text.main',
    transform: 'translate(22px, -2px) scale(0.75)', 
  },  
  '& .Mui-focused fieldset': {
    borderColor: 'form.input',
  },
  '&.focused label': { 
    transform: 'translate(22px, -2px) scale(0.75)'
  },
} 
const FormInputPhone = {
  width: '100%', 
  marginBottom: '10px',
  'div': { 
    height: '45px'
  },
  'label': {
    fontSize: '12px',
    color: 'text.main',
    top: '-2px',  
  },
  'input': {
    fontSize: '12px'
  },
  '& label.Mui-focused': {
    color: 'text.main',
    transform: 'translate(22px, -2px) scale(0.75)', 
  },  
  '& .Mui-focused fieldset': {
    borderColor: 'form.input',
  },
  '&.focused label': { 
    transform: 'translate(22px, -2px) scale(0.75)'
  },
} 
const InputInner2 = {
  display: 'flex', 
  justifyContent: 'space-between',
  gap: '10px'
} 
const CertifiCateNumBox = styled('span')(() => ({ 
  position: 'absolute',
  right: '20px',
  top: '15px',
  color: 'red',
  fontWeight: '500'
}))