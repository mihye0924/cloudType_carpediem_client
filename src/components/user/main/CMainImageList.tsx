import { Box, IconButton, styled } from "@mui/material";
import { AddAPhotoOutlined } from "@mui/icons-material";
import { userState } from "@/recoil/atoms/userState";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { listModalStatus, writeModalStatus } from "@/recoil/atoms/modalStatus";
import { profileStatus } from "@/recoil/atoms/profileStatus";
import { listStatus, listType } from "@/recoil/atoms/listState";
import CButton from "@/components/button";
import { useLocation, useNavigate } from "react-router";
import { useState } from "react";
import CAlert from "@/components/alert";

// interface goodSaveType {
//   good_no: number;
//   account_name: string | undefined;
//   good_checked: boolean;
// }
const CMainImageList = () => {
  const path = useLocation().pathname.split("/")[1];
  const user = useRecoilValue(userState);
  const setWrite = useSetRecoilState(writeModalStatus); // 프로필 편집
  const profile = useRecoilValue(profileStatus);
  const list = useRecoilValue(listStatus);
  const navigate = useNavigate();
  const [alert, setAlert] = useState("");
  const [listModal, setListModal] = useRecoilState(listModalStatus);

  // 좋아요 기본 셋팅
  // const listGoodSave = useCallback(async(item: listType) => {
  //   let newList: goodSaveType[] = []

  //   console.log(item.list_good_save,'데이터 없음')
  //   if(item.list_good_save.length === 0) {
  //     console.log('데이터 없음')
  //     newList = [
  //       {
  //         good_no: item.account_no,
  //         account_name: user.account_name,
  //         good_checked: false
  //       }
  //     ]
  //   }else{
  //     item.list_good_save.forEach((item2) => {
  //       const idx = item.list_good_save.indexOf(item2)
  //       if(item2.account_name === user.account_name) {
  //         console.log('데이터 있고, 아이디가 동일함',idx)
  //         newList[idx] =
  //         {
  //           good_no: idx,
  //           account_name: user.account_name,
  //           good_checked: false
  //         }
  //       }else{
  //         console.log('데이터 있고, 아이디가 동일하지 않음',idx)
  //         newList = [
  //           ...item.list_good_save,
  //           {
  //             good_no: item.account_no,
  //             account_name: user.account_name,
  //             good_checked: false
  //           }
  //         ]
  //       }
  //     })
  //   }

  //   const data = {
  //     list_good_save: JSON.stringify(newList),
  //     list_no: item.list_no,
  //     account_name: item.account_name,
  //   }
  //   await axios({
  //     method: 'put',
  //     url: `${import.meta.env.VITE_BACK_URL}/list/goodList`,
  //     data: data,
  //     withCredentials: true
  //   })
  // },[list, user.account_name])

  const handleImageList = async (item: listType) => {
    setListModal(!listModal);
    !user.isAuth
      ? setAlert("로그인이 필요합니다")
      : navigate(`/${item.account_name}/${item.list_no}`);
    // listGoodSave(item)
  };

  return (
    <Section
      className={`${!user.isAuth ? "not_login" : ""}${
        user.isAuth && profile.account_link ? "height30" : ""
      }${user.isAuth && profile.account_info ? "height30" : ""}${
        user.isAuth && profile.account_link && profile.account_info
          ? "height40"
          : ""
      }`}
    >
      {list.length > 0 ? (
        <>
          <ListImage>
            {list.map((item) => (
              <li key={item.list_no}>
                <CButton onClick={() => handleImageList(item)}>
                  <img
                    src={`${import.meta.env.VITE_BACK_URL}/uploads/list/${
                      item.list_image[0].img
                    }`}
                    alt="이미지"
                  />
                </CButton>
              </li>
            ))}
          </ListImage>
        </>
      ) : (
        <>
          {user.isAuth && user.account_name === path ? (
            <NotFound>
              <Box>
                <IconButton
                  disableRipple
                  aria-label="menu"
                  onClick={() => {
                    setWrite((prev) => {
                      return {
                        ...prev,
                        modal: true,
                        step: 1,
                      };
                    });
                  }}
                >
                  <AddAPhotoOutlined />
                </IconButton>
                <p>사진 공유</p>
                <span>사진을 공유하면 회원님의 프로필에 표시됩니다.</span>
              </Box>
            </NotFound>
          ) : (
            <NotFound>
              <Box>게시글이 없습니다.</Box>
            </NotFound>
          )}
        </>
      )}
      {
        <CAlert
          open={alert !== ""}
          onClose={() => {
            setAlert("");
          }}
        >
          <>{alert}</>
        </CAlert>
      }
    </Section>
  );
};

export default CMainImageList;

const Section = styled("section")(() => ({
  width: "100%",
  overflowY: "auto",
  maxWidth: "975px",
  margin: "0 auto",
  height: "calc( 100vh - 273px )",
  "&.not_login": {
    height: "calc( 100vh - 268px )",
  },
  "&.height30": {
    height: "calc( 100vh - 268px - 30px )",
  },
  "&.height40": {
    height: "calc( 100vh - 268px - 50px )",
  },
  "&::-webkit-scrollbar": {
    width: "10px",
    backgroundColor: "#f1f1f1",
  },
  "&::-webkit-scrollbar-thumb": {
    width: "10px",
    backgroundColor: "#2d4b97",
    backgroundClip: "padding-box",
    border: "2px solid transparent",
    borderRadius: "30px",
  },
}));
const ListImage = styled("ul")(({ theme }) => ({
  position: "relative",
  display: "flex",
  flexWrap: "wrap",
  boxSizing: "border-box",
  padding: 0,
  gap: "10px",
  margin: "10px",
  "& li": {
    width: "calc((100% - 20px)/3)",
    backgroundColor: "#efefef",
    padding: 0,
    overflow: "hidden",
  },
  button: {
    position: "relative",
    display: "inline-block",
    width: "100%",
    backgroundColor: "transparent",
    paddingBottom: "100%",
    border: theme.palette.background.border,
    borderRadius: 0,
  },
  "& img": {
    position: "absolute",
    objectFit: "cover",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
}));
const NotFound = styled("div")(({ theme }) => ({
  // backgroundColor: '',
  height: "100%",
  textAlign: "center",
  fontWeight: 900,
  fontSize: "12px",
  // border: '1px solid #f1f1f1',
  position: "relative",
  div: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
  },
  button: {
    border: `1px solid ${theme.palette.text.default}`,
    color: "#393939",
    marginBottom: "20px",
    padding: 20,
    svg: {
      fontSize: "30px",
      color: theme.palette.text.default,
    },
  },
  p: {
    fontSize: "24px",
    marginBottom: "20px",
    fontWeight: "400",
    color: theme.palette.text.default,
  },
  span: {
    lineHeight: 1.2,
    fontWeight: "400",
    color: theme.palette.text.default,
  },
}));
