import {
  Box,
  IconButton,
  ListItem,
  ListItemButton,
  TextareaAutosize,
  styled,
} from "@mui/material";
import CButton from "@/components/button";
import {
  MoreHoriz,
  FavoriteBorder,
  TurnedInNot,
  ChatBubbleOutline,
  Favorite,
} from "@mui/icons-material";

// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router";
import { listType } from "@/recoil/atoms/listState";
import { useRecoilState, useRecoilValue } from "recoil";
import { userState } from "@/recoil/atoms/userState";
import CAlert from "@/components/alert";
import { listModalStatus } from "@/recoil/atoms/modalStatus";

const CMainThumb = () => {
  const path = useLocation().pathname;
  const [list, setList] = useState([]); // 리스트 데이터
  const user = useRecoilValue(userState); // 내 회원정보
  const [menu, setMenu] = useState(false);
  const [alert, setAlert] = useState("");
  const [alertStatus, setAlertStatus] = useState("");
  const [more, setMore] = useState(false);
  const [listModal, setListModal] = useRecoilState(listModalStatus);
  // const [reply, setReplyModal] = useRecoilState(replyModalStatus)
  const [content, setContent] = useState("");
  const [updateForm, setUpdateForm] = useState(false);
  const [like, setLike] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [reply, setReply] = useState("");

  const contentRef = useRef<HTMLTextAreaElement>(null);
  const replyRef = useRef<HTMLTextAreaElement>(null);
  const navigate = useNavigate();

  // 리스트 데이터 가져오기
  const getListData = useCallback(async () => {
    await axios({
      method: "get",
      url: `${import.meta.env.VITE_BACK_URL}/list/${path.split("/")[1]}`,
      withCredentials: true,
    })
      .then((res) => {
        if (res.data.code === 200) {
          setList(res.data.result);

          // 게시물 랜더링
          res.data.result.filter(
            (item: {
              account_name: string;
              list_no: number;
              list_content: string;
            }) => {
              if (
                item.account_name === path.split("/")[1] &&
                item.list_no === Number(path.split("/")[2])
              ) {
                setContent(item.list_content);
              }
            }
          );
        }
      })
      .catch((err) => console.log(err));
  }, [path]);

  // 리스트 게시글 삭제
  const handleListDelete = async (account_name: string, list_no: number) => {
    await axios({
      method: "delete",
      url: `${import.meta.env.VITE_BACK_URL}/list/${account_name}/${list_no}`,
      withCredentials: true,
    })
      .then((res) => {
        if (res.data.code === 200) {
          setAlert("게시글이 삭제되었습니다.");
          setAlertStatus("listDeleteSuccess");
        } else {
          setAlert("게시글이 삭제되지 않았습니다.");
        }
      })
      .catch((err) => console.log(err));
  };

  // 게시글 수정하기
  const handleListUpdate = async (
    account_name: string,
    list_no: number,
    content: string
  ) => {
    if (content === "") {
      (contentRef.current as HTMLElement).focus();
      setAlert("문구를 입력해주세요.");
      return;
    }
    const data = {
      account_name: account_name,
      list_no: list_no,
      list_content: content,
    };
    await axios({
      method: "put",
      url: `${import.meta.env.VITE_BACK_URL}/list/update`,
      data: data,
      withCredentials: true,
    })
      .then((res) => {
        if (res.data.code === 200) {
          setAlert("게시글이 수정되었습니다.");
          setAlertStatus("listUpdateSuccess");
        } else {
          setAlert("게시글이 삭제되지 않았습니다.");
        }
      })
      .catch((err) => console.log(err));
  };

  // 리스트 좋아요 가져오기
  const getLikesData = useCallback(async () => {
    await axios({
      method: "get",
      url: `${import.meta.env.VITE_BACK_URL}/list/likes/${path.split("/")[1]}`,
      withCredentials: true,
    })
      .then((res) => {
        if (res.data.code === 200) {
          setLikeCount(res.data.results.length);
          // 좋아요 이미지 바꾸기
          if (res.data.results.length > 0) {
            res.data.results.forEach((item: { account_name: string }) => {
              if (item.account_name === user.account_name) {
                setLike(true);
              } else {
                setLike(false);
              }
            });
          } else {
            setLike(false);
          }
        }
      })
      .catch((err) => console.log(err));
  }, [path, user.account_name]);

  // 리스트 좋아요
  const handleLike = async (account_name: string, list_no: number) => {
    const data = {
      account_name: account_name,
      list_no: list_no,
    };
    await axios({
      method: "post",
      url: `${import.meta.env.VITE_BACK_URL}/list/likes`,
      data: data,
      withCredentials: true,
    })
      .then(() => {
        setLike(true);
        setLikeCount(likeCount + 1);
      })
      .catch((err) => console.log(err));
  };

  // 좋아요 삭제
  const handleLikeRemove = async (account_name: string, list_no: number) => {
    await axios({
      method: "delete",
      url: `${
        import.meta.env.VITE_BACK_URL
      }/list/likes/${account_name}/${list_no}`,
      withCredentials: true,
    })
      .then(() => {
        setLike(false);
        setLikeCount(likeCount - 1);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getListData();
    getLikesData();
  }, [getListData, getLikesData]);

  return (
    <>
      {list.map((item: listType) => {
        return (
          item.list_no === Number(path.split("/")[2]) && (
            <MainBox key={item.list_no}>
              <SwiperBox>
                <Swiper
                  // install Swiper modules
                  modules={[Navigation, Pagination, Scrollbar, A11y]}
                  slidesPerView={1}
                  pagination={{
                    el: ".swiper-pagination",
                    clickable: true,
                  }}
                >
                  {item.list_image.map((imgItem) => (
                    <SwiperSlide key={imgItem.id}>
                      <CButton onClick={() => console.log("이미지")}>
                        <img
                          src={`${import.meta.env.VITE_BACK_URL}/uploads/list/${
                            imgItem.img
                          }`}
                          alt=""
                        />
                      </CButton>
                    </SwiperSlide>
                  ))}
                </Swiper>
                <div className="swiper-pagination"></div>
              </SwiperBox>
              <ContentBox>
                <ThumbBox>
                  <CButton onClick={() => console.log("프로필보기")}>
                    <Box sx={ListImgBox}>
                      <img
                        src={
                          item.account_profile === "profile-dummy.svg"
                            ? "/assets/images/profile-dummy.svg"
                            : `${
                                import.meta.env.VITE_BACK_URL
                              }/uploads/profile/${item.account_profile}`
                        }
                        alt="profile"
                      />
                    </Box>
                    <p>{path.split("/")[1]}</p>
                  </CButton>
                  <Box>
                    {user.isAuth && user.account_name !== path.split("/")[1] ? (
                      <CButton
                        style={FollowButton}
                        type="lightgray"
                        onClick={() => console.log("팔로우")}
                      >
                        팔로우
                      </CButton>
                    ) : (
                      <IconButton
                        disableRipple
                        sx={MenuIcon}
                        aria-label="menu"
                        onClick={() => setMenu(!menu)}
                      >
                        <MoreHoriz />
                      </IconButton>
                    )}
                    {menu && (
                      <ListMenu>
                        <ListItem>
                          <ListItemButton
                            disableRipple
                            onClick={() =>
                              handleListDelete(item.account_name, item.list_no)
                            }
                          >
                            <p>삭제하기</p>
                          </ListItemButton>
                        </ListItem>
                        <ListItem>
                          <ListItemButton
                            disableRipple
                            onClick={() => {
                              setUpdateForm(!updateForm), setMenu(!menu);
                            }}
                          >
                            <p>수정하기</p>
                          </ListItemButton>
                        </ListItem>
                      </ListMenu>
                    )}
                  </Box>
                </ThumbBox>
                <ReplyBox>
                  <Box>
                    <Box sx={ThumbFuctionBox2Con}>
                      {updateForm ? (
                        <>
                          <Box sx={textAreaBox}>
                            <TextareaAutosize
                              ref={contentRef}
                              aria-label="textarea"
                              placeholder="문구를 입력해주세요..."
                              value={content}
                              onChange={(
                                event: ChangeEvent<HTMLTextAreaElement>
                              ) => setContent(event.target.value)}
                              maxLength={500}
                            />
                            <span>{content.length} / 500</span>
                          </Box>
                          <CButton
                            type="blueBorder"
                            style={ContentUpdateButton}
                            onClick={() =>
                              handleListUpdate(
                                item.account_name,
                                item.list_no,
                                content
                              )
                            }
                          >
                            수정하기
                          </CButton>
                        </>
                      ) : (
                        <ContentBox2>
                          <Box>
                            <Box sx={ListImgBox}>
                              <img
                                src={
                                  item.account_profile === "profile-dummy.svg"
                                    ? "/assets/images/profile-dummy.svg"
                                    : `${
                                        import.meta.env.VITE_BACK_URL
                                      }/uploads/profile/${item.account_profile}`
                                }
                                alt="profile"
                              />
                            </Box>
                            <p>{path.split("/")[1]}</p>
                          </Box>
                          <p className={more ? "active" : ""}>{content}</p>
                          {item.list_content.length > 100 && (
                            <CButton
                              type="blueBorder"
                              onClick={() => setMore(!more)}
                            >
                              {!more ? "더보기" : "접기"}
                            </CButton>
                          )}
                        </ContentBox2>
                      )}
                    </Box>
                  </Box>
                </ReplyBox>
                <InnerBox>
                  <Box sx={ThumbFuctionBox1}>
                    <Box>
                      {like ? (
                        <IconButton
                          disableRipple
                          sx={HeartIcon}
                          aria-label="heart"
                          onClick={() =>
                            handleLikeRemove(item.account_name, item.list_no)
                          }
                        >
                          <Favorite sx={{ fontSize: "28px" }} />
                        </IconButton>
                      ) : (
                        <IconButton
                          disableRipple
                          sx={HeartIcon}
                          aria-label="heart"
                          onClick={() =>
                            handleLike(item.account_name, item.list_no)
                          }
                        >
                          <FavoriteBorder sx={{ fontSize: "28px" }} />
                        </IconButton>
                      )}
                      <IconButton
                        disableRipple
                        sx={ReplyIcon}
                        aria-label="reply"
                        onClick={() => {
                          console.log("동작");
                        }}
                      >
                        <ChatBubbleOutline sx={{ fontSize: "28px" }} />
                      </IconButton>
                    </Box>
                    <Box>
                      <IconButton
                        disableRipple
                        sx={CaptionIcon}
                        aria-label="caption"
                        onClick={() => console.log("북마크")}
                      >
                        <TurnedInNot sx={{ fontSize: "28px" }} />
                      </IconButton>
                    </Box>
                  </Box>
                  <Box sx={ThumbFuctionBox2}>
                    <CButton onClick={() => console.log("좋아요 00 개")}>
                      좋아요 {likeCount} 개
                    </CButton>
                  </Box>
                  <Box sx={ReplyWriteBox}>
                    <TextareaAutosize
                      ref={replyRef}
                      aria-label="textarea"
                      placeholder="댓글달기...."
                      value={reply}
                      onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
                        setReply(event.target.value)
                      }
                      maxLength={500}
                    />
                    <CButton type="blue" onClick={() => console.log("게시")}>
                      게시
                    </CButton>
                  </Box>
                </InnerBox>
              </ContentBox>
            </MainBox>
          )
        );
      })}
      {
        <CAlert
          open={alert !== ""}
          onClose={() => {
            setAlert("");
            switch (alertStatus) {
              case "listDeleteSuccess":
                navigate(`/${path.split("/")[1]}`), setListModal(!listModal);
                return;
              case "listUpdateSuccess":
                setUpdateForm(!updateForm);
                setListModal(true);
            }
          }}
        >
          <>{alert}</>
        </CAlert>
      }
    </>
  );
};

export default CMainThumb;
const MainBox = styled("div")(() => ({
  width: "100%",
  height: "100%",
  display: "inline-flex",
  flexWrap: "wrap",
}));
const ThumbBox = styled("nav")(({ theme }) => ({
  borderBottom: theme.palette.background.border,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px",
  ">button": {
    padding: 0,
    minWidth: "fit-content",
    backgroundColor: "transparent",
    p: {
      textTransform: "lowercase",
      fontSize: "18px",
      marginLeft: "10px",
      color: theme.palette.text.default,
    },
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
}));
const ListImgBox = {
  width: "35px",
  height: "35px",
  overflow: "hidden",
  borderRadius: "50%",
  img: {
    width: "100%",
    objectFit: "cover",
  },
};
const FollowButton = {
  padding: "0 5px",
  minWidth: "55px",
  fontSize: "12px",
  lineHeight: 2,
};
const SwiperBox = styled("div")(({ theme }) => ({
  overflow: "hidden",
  width: "100%",
  flex: 1,
  position: "relative",
  flexBasis: "780px",
  borderRight: theme.palette.background.border,
  ".swiper-slide": {
    button: {
      padding: 0,
      border: 0,
      borderRadius: 0,
      position: "relative",
      overflow: "hidden",
      width: "100%",
      height: "calc( 840px - 50px)",
      "&:hover": {
        backgroundColor: "transparent",
      },
      img: {
        width: "100%",
        objectPosition: "center",
        height: "100%",
        objectFit: "cover",
      },
    },
  },
  ".swiper-pagination-bullets": {
    bottom: "var(--swiper-pagination-bottom, 20px)",
  },
  ".swiper-pagination-bullet": {
    backgroundColor: theme.palette.text.default,
    opactiy: "var(--swiper-pagination-bullet-inactive-opacity, 1)",
  },
  ".swiper-pagination-bullet-active": {
    backgroundColor: "#2d4b97",
  },
}));
const ContentBox = styled("div")(() => ({
  flex: 1,
  width: "100%",
  flexBasis: "500px",
  position: "relative",
}));

const ContentBox2 = styled("div")(({ theme }) => ({
  padding: "15px",
  backgroundColor: theme.palette.background.replyContent,
  margin: "10px",
  borderRadius: "5px",
  ">div": {
    display: "flex",
    alignItems: "center",
    p: {
      fontWeight: "600",
      marginLeft: "10px",
      padding: 0,
    },
  },
  ".MuiButton-root": {
    color: "#2d4b97",
  },
}));
const InnerBox = styled("div")(({ theme }) => ({
  width: "100%",
  borderTop: theme.palette.background.border,
  padding: "15px",
  ".swiper-pagination-bullets": {
    top: "var(--swiper-pagination-top, 10px)",
  },
}));

const ReplyBox = styled("div")(() => ({
  position: "relative",
  height: "calc(100% - 250px)",
  maxHeight: "calc( 100vh - 685px )",
  minHeight: " 500px",
  // border: '1px solid white',
  overflowY: "auto",
  "&::-webkit-scrollbar": {
    width: "0",
  },
}));
const ThumbFuctionBox1 = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  height: "25px",
};
const ThumbFuctionBox2 = {
  margin: "10px 0",
  textAlign: "left",
  button: {
    "&.MuiButton-root": {
      backgroundColor: "transparent",
    },
    minWidth: "fit-content",
    padding: 0,
    color: "text.default",
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
};
const ContentUpdateButton = {
  marginLeft: "10px",
  "&.MuiButton-root": {
    color: "#2d4b97 !important",
  },
};
const ThumbFuctionBox2Con = {
  "& p": {
    margin: "15px 0",
    color: "text.default",
    textOverflow: "ellipsis",
    overflow: "hidden",
    display: "-webkit-box",
    WebkitLineClamp: "1" /* 라인수 */,
    WebkitBoxOrient: "vertical",
    width: "100%",
    wordBreak: "break-word",
    "&.active": {
      width: "100%",
      textOverflow: "initial",
      WebkitLineClamp: "inherit" /* 라인수 */,
      lineHeight: 1.2,
      height: "auto",
      wordBreak: "break-all",
    },
  },
  textAlign: "left",
  button: {
    "&.MuiButton-root": {
      // backgroundColor: '',
    },
    minWidth: "fit-content",
    padding: "0 15px",
    color: "text.default",
    "&:hover": {
      backgroundColor: "#fff",
      color: "#2d4b97",
    },
  },
};

const MenuIcon = {
  padding: 0,
  marginLeft: "10px",
  "&.MuiIconButton-root": {
    svg: {
      color: "text.default",
    },
  },
  "&:hover": {
    bgcolor: "transparent",
  },
};
const HeartIcon = {
  padding: 0,
  "&.MuiIconButton-root": {
    svg: {
      color: "text.default",
    },
  },
  "&:hover": {
    bgcolor: "transparent",
  },
};
const ReplyIcon = {
  padding: 0,
  "&.MuiIconButton-root": {
    svg: {
      color: "text.default",
    },
  },
  marginLeft: "10px",
};
const CaptionIcon = {
  padding: 0,
  "&.MuiIconButton-root": {
    svg: {
      color: "text.default",
    },
  },
  "&:hover": {
    bgcolor: "transparent",
  },
};
const ListMenu = styled("ul")(({ theme }) => ({
  position: "absolute",
  top: "80px",
  right: "10px",
  border: theme.palette.background.border,
  backgroundColor: "#fff",
  zIndex: 3,
  boxShadow: theme.palette.boxShadow.default,
  borderRadius: "5px",
  li: {
    borderBottom: theme.palette.background.border,
    p: {
      color: "#393939",
      fontWeight: "600",
    },
    "&:last-of-type": {
      borderBottom: 0,
    },
    div: {
      "&:hover": {
        backgroundColor: "transparent",
        p: {
          color: "#2d4b97",
        },
      },
    },
  },
}));

const textAreaBox = {
  textAlign: "right",
  padding: "15px",
  textarea: {
    width: "100%",
    padding: "5px",
    borderRadius: "5px",
    height: "90px !important",
    border: "1px solid #f1f1f1",
    resize: "none",
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

const ReplyWriteBox = {
  display: "flex",
  gap: "10px",
  textarea: {
    borderRadius: "5px",
    padding: "5px",
    width: "100%",
    height: "90px !important",
    resize: "none",
    overflowY: "auto !important",
    fontSize: "16px",
    "&:focus": {
      outline: "1px solid #000 !important",
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
  },
};
