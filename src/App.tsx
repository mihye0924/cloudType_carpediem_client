import Router from '@/routes/Router'      
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { useRecoilValue } from 'recoil'; 
import { modeState } from '@/recoil/atoms/modeState';
import { useEffect, useMemo } from 'react';
import { getDesignTokens } from '@/theme/theme';   
import { useLocation, useNavigate } from 'react-router';

function App() {    
  const mode = useRecoilValue(modeState)    
  const theme = useMemo(() => createTheme(getDesignTokens(mode)),[mode]);
  const path = useLocation().pathname
  const navigate = useNavigate()

  useEffect(() => { 
    if(path === "/") {
      navigate("/login")
    }
  },[navigate, path])

  return (     
    <ThemeProvider theme={theme}>  
      <CssBaseline />
      <Router />     
    </ThemeProvider> 
  )
}

export default App
