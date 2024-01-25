import "@mui/material";

declare module "@mui/material/styles" { 
  interface Palette { 
    form: {
      main: string;
      input: string;
      checkbox: string;
    },
    blueBtn: {
      main: string,
      dark: string; 
      contrastText: string;
    },
    grayBtn: {
      main: string, 
      light: string; 
      contrastText: string;
      hoverText: string;
      border: string
    }, 
    boxShadow: {
      default: string;
    }
  }
  interface TypeBackground { 
    border: string;  
    replyContent: string;
  }
  interface TypeText {  
    default: string; 
    main: string; 
  } 
}