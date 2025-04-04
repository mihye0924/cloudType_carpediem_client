 
import { PaletteMode } from "@mui/material";  

export const getDesignTokens = (mode: PaletteMode) => ({
  palette: { 
    mode,  
    // 다크모드일 때
    ...(mode === 'dark' ? {
      background: {
        default: '#0e0e0e', // 배경(검정)
        border: '1px solid #1a1a1a', 
        contrastText: "#fff",
        replyContent: '#1c1c1c'
      },  
      blueBtn: {// 버튼(파랑)
        main: '#2d4b97',
        dark: '#162753',
        contrastText: "#fff" 
      },
      grayBtn: {// 버튼(회색)
        main: '#2d4b97',
        light: '#fff', 
        contrastText: "#fff",
        hoverText: '#2d4b97',
        border: '#fff'   
      },
      text:{  
        default: '#fff',
        main: '#fff',  
      },
      form: { 
        main: '#2d4b97',
        input: '#fff !important',
        checkbox: '#2d4b97'
      },
      boxShadow: {
        default: '-5px 5px 10px -1px rgb(255 255 255 / 8%)'
      }
    } : {
    // 밝을 때
      background: { // 배경
        default: '#fff', // 배경(흰색)
        border: '1px solid #f1f1f1', 
        contrastText: '#fff',
        replyContent: '#f1f1f1'
      }, 
      blueBtn: {
        main: '#2d4b97',
        dark: '#162753',
        contrastText: "#fff"
      },
      grayBtn: {// 버튼(회색)
        main: '#f1f1f1',
        light: '#fff',
        contrastText: "#393939",
        hoverText: '#2d4b97',
        border: '#2d4b97' 
      },
      text:{  
        default: '#393939',
        main: '#2d4b97', 
      },
      form: { 
        main: '#2d4b97',
        input: '#2d4b97 !important',
        checkbox: '#2d4b97'
      },
      boxShadow: {
        default: '-5px 5px 10px -1px rgb(103 103 103 / 37%)'
      }
    })
  }, 
  typography: {
    fontFamily: 'Noto Sans KR, sans-serif'
  },
}); 