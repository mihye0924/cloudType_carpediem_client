import { styled, Switch } from "@mui/material";

// 게시글 추가
export const modalStyle = {
  "&.MuiBox-root": {
    textAlign: "center",
    backgroundColor: "background.default",
    width: "100%",
    maxWidth: "580px",
    maxHeight: "840px",
    position: "relative",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    section: {
      "&:first-of-type": {
        "& p": {
          fontSize: "14px",
          position: "absolute",
          transform: "translate(-50%, -50%)",
          top: "50%",
          left: "50%",
        },
        svg: {
          color: "text.default",
        },
      },
      "&:last-of-type": {
        position: "relative",
        maxHeight: "calc( 840px - 50px )",
        display: "block",
        "& svg": {
          fontSize: "60px",
          color: "text.default",
          marginBottom: "20px",
        },
      },
    },
  },
  ".MuiSvgIcon-root": {
    color: "#393939",
  },
};
export const CreateListButton = {
  width: "35%",
  "&:hover": {
    backgroundColor: "#162753",
  },
  backgroundColor: "#2d4b97",
  color: "#fff",
  margin: "30px 0 10px 0",
};
export const imgBox = {
  width: "100%",
  padding: "0 10px",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%,-50%)",
  "& p": {
    color: "text.default",
  },
};
export const SwiperBox = styled("div")(({ theme }) => ({
  width: "100%",
  height: "100%",
  ".swiper": {
    height: "100%",
  },
  ".swiper-slide": {
    img: {
      width: "100%",
      height: "100%",
      objectFit: "contain",
    },
  },
  ".swiper-button-prev": {
    backgroundColor: "rgb(0 0 0 / 23%)",
    width: "45px",
    height: "45px",
    borderRadius: "50%",
    "&:after": {
      fontSize: "18px",
      fontWeight: "900",
      color: "#fff",
    },
  },
  ".swiper-button-next": {
    backgroundColor: "rgb(0 0 0 / 23%)",
    width: "45px",
    height: "45px",
    borderRadius: "50%",
    "&:after": {
      fontSize: "18px",
      fontWeight: "900",
      color: "#fff",
    },
  },
  ".swiper-pagination-bullet": {
    backgroundColor: theme.palette.text.default,
    opactiy: "var(--swiper-pagination-bullet-inactive-opacity, 1)",
  },
  ".swiper-pagination-bullet-active": {
    backgroundColor: "#2d4b97",
  },
}));
export const ContentBox = styled("div")(({ theme }) => ({
  padding: "10px",
  height: "calc(100% - 50%)",
  borderTop: theme.palette.background.border,
  overflowY: "auto",
  "&::-webkit-scrollbar": {
    width: "0",
  },
}));
export const profieImgBox = {
  display: "flex",
  gap: "10px",
  alignItems: "center",
  div: {
    display: "inline-block",
    width: "35px",
    height: "35px",
    overflow: "hidden",
    borderRadius: "50%",
  },
  img: {
    width: "100%",
    height: "auto",
  },
  "& p": {
    color: "text.default",
    fontWeight: "500",
    fontSize: "14px",
  },
};
export const textAreaBox = {
  marginTop: "10px",
  textAlign: "right",
  textarea: {
    width: "100%",
    padding: "5px",
    height: "305px !important",
    border: "1px solid #f1f1f1",
    borderRadius: "5px",
    "&:focus": {
      outline: "1px solid #000 !important",
    },
  },
  span: {
    color: "text.default",
    display: "inline-block",
    marginTop: "5px",
    fontWeight: "500",
    fontSize: "12px",
  },
};

// 프로필 편집
export const modalStyle2 = {
  "&.MuiBox-root": {
    textAlign: "center",
    backgroundColor: "background.default",
    width: "100%",
    maxWidth: "580px",
    maxHeight: "840px",
    position: "relative",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    section: {
      "&:first-of-type": {
        "& p": {
          fontSize: "14px",
          position: "absolute",
          transform: "translate(-50%, -50%)",
          top: "50%",
          left: "50%",
        },
        svg: {
          color: "text.default",
        },
      },
      "&:last-of-type": {
        display: "flex",
        flexDirection: "column",
        position: "relative",
        maxHeight: "calc( 840px - 50px )",
        "& svg": {
          fontSize: "60px",
          marginBottom: "20px",
        },
      },
    },
  },
  ".MuiSvgIcon-root": {
    color: "#393939",
  },
};
export const ProfileImgBox = {
  width: "80px",
  height: "80px",
  flexBasis: "80px",
  borderRadius: "50%",
  overflow: "hidden",
  img: {
    width: "100%",
  },
};
export const FormInputId = {
  backgroundColor: "#fff",
  flex: 1,
  input: {
    fontSize: "12px",
    border: "1px solid #f1f1f1",
    padding: "10px",
    borderRadius: "5px",
    color: "#393939",
  },
  "& .Mui-disabled": {
    textFillColor: "#393939 !important",
  },
  "& .Mui-focused fieldset": {
    borderColor: "form.input",
    borderWidth: "1px !important",
  },
};
export const EditRow1 = {
  padding: "0 10px",
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  gap: "10px",
  "& img": {
    width: "80px",
    height: "auto",
  },
};
export const EditRow2 = {
  padding: "0 10px",
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "10px",
  marginTop: "10px",
  "& p": {
    color: "text.default",
    fontSize: "12px",
    flexBasis: "80px",
  },
  textarea: {
    flex: 1,
    height: "130px !important",
    border: "1px solid #c7c7c7",
    borderRadius: "5px",
    padding: "10px",
    color: "#393939",
    fontWeight: "300",
    fontSize: "12px",
    "&:focus": {
      outline: "1px solid #2d4b97",
    },
    "&:hover": {
      outline: "1px solid #000",
    },
  },
};
export const blueBtn = {
  border: "1px solid #2d4b97",
  marginTop: "10px",
  backgroundColor: "#fff",
  width: "120px",
  height: "25px",
  fontSize: "12px",
  color: "#2d4b97",
  "&:hover": {
    backgroundColor: "#fff",
  },
};

// 게시물
export const modalStyle3 = {
  "&.MuiBox-root": {
    textAlign: "center",
    overflow: "hidden",
    backgroundColor: "background.default",
    width: "100%",
    maxWidth: "1280px",
    maxHeight: "840px",
    position: "relative",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    section: {
      "&:first-of-type": {
        "& p": {
          fontSize: "14px",
          position: "absolute",
          transform: "translate(-50%, -50%)",
          top: "50%",
          left: "50%",
        },
        svg: {
          color: "text.default",
        },
      },
      "&:last-of-type": {
        overflowY: "auto",
        // position: 'relative',
        maxWidth: "100%",
        height: "calc( 840px - 50px )",
        maxHeight: "calc( 100vh - 50px )",
        display: "flex",
        "& svg": {
          fontSize: "24px",
        },
        "&::-webkit-scrollbar": {
          width: "0",
          overflow: "hidden",
        },
      },
    },
  },
  ".MuiSvgIcon-root": {
    color: "#393939",
  },
};

// 메뉴
export const MenuSection = styled("div")(({ theme }) => ({
  padding: "20px 10px",
  "& h1": {
    color: theme.palette.text.default,
    fontSize: "24px",
    fontWeight: "600",
    margin: "0 10px 0 10px",
  },
  "& h2": {
    color: theme.palette.text.default,
    fontSize: "14px",
    margin: "40px 10px 0 10px",
  },
  ul: {
    paddingTop: "0",
    paddingBottom: "30px",
    "& li": {
      display: "flex",
      justifyContent: "space-between",
      padding: "25px 10px 0 10px",
      "> div": {
        padding: "0",
        p: {
          color: theme.palette.text.default,
          fontWeight: 500,
          fontSize: "14px",
        },
        "&:hover": {
          backgroundColor: "transparent",
        },
      },
      p: {
        color: theme.palette.text.default,
        fontWeight: 500,
        fontSize: "14px",
      },
    },
  },
}));
export const BoxInner = styled("div")(({ theme }) => ({
  borderBottom: theme.palette.background.border,
}));
export const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 33,
  height: 20,
  padding: 0,
  display: "flex",
  borderRadius: "25px",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 15,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(9px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 4,
    "&.Mui-checked": {
      transform: "translateX(12px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#177ddc" : "#2d4b97",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: theme.palette.mode === "dark" ? "#fff" : "#fff",
    transition: theme.transitions.create(["width"], {
      duration: 200,
    }),
  },
}));
