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
    txt: {
      default: string;
      main: string
    }
  }
  interface TypeBackground {  
    underline: string; 
  }
  interface TypeText {  
    default: string; 
    main: string;
  }
}