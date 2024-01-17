import Router from '@/routes/Router'      
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { useRecoilValue } from 'recoil'; 
import { modeState } from '@/recoil/atoms/modeState';
import { useMemo } from 'react';
import { getDesignTokens } from '@/theme/theme';   

function App() {    
  const mode = useRecoilValue(modeState)    
  const theme = useMemo(() => createTheme(getDesignTokens(mode)),[mode]);
 

  return (     
    <ThemeProvider theme={theme}>  
      <CssBaseline />
      <Router />     
    </ThemeProvider> 
  )
}

export default App
