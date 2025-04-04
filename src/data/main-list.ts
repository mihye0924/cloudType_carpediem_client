import { Data, Column } from "@/components/admin/main/list/types";

export const columns: readonly Column[] = [
  {
    id: "num",
    label: "번호",
    minWidth: 60,
    align: "center",
  },
  {
    id: "check",
    label: "체크",
    align: "center",
    custom: true,
  },
  {
    id: "userId",
    label: "아이디",
    minWidth: 100,
    align: "center",
  },
  {
    id: "userPw",
    label: "비밀번호",
    minWidth: 170,
    align: "center",
  },
  {
    id: "userName",
    label: "이름",
    minWidth: 170,
    align: "center",
  },
  {
    id: "userBirth",
    label: "생년월일",
    minWidth: 170,
    align: "center",
  },
  {
    id: "userPhone",
    label: "전화번호",
    minWidth: 170,
    align: "center",
  },
  {
    id: "userEmail",
    label: "이메일",
    minWidth: 170,
    align: "center",
  },
];

export const rows = [
  createData(
    1,
    false,
    "mihye0924",
    "1234",
    "조미혜",
    "1997.09.24",
    "01047755749",
    "474968@naver.com"
  ),
  createData(
    2,
    false,
    "mihye0924",
    "1234",
    "조미혜",
    "1997.09.24",
    "01047755749",
    "474968@naver.com"
  ),
  createData(
    3,
    false,
    "mihye0924",
    "1234",
    "조미혜",
    "1997.09.24",
    "01047755749",
    "474968@naver.com"
  ),
  createData(
    4,
    false,
    "mihye0924",
    "1234",
    "조미혜",
    "1997.09.24",
    "01047755749",
    "474968@naver.com"
  ),
  createData(
    5,
    false,
    "mihye0924",
    "1234",
    "조미혜",
    "1997.09.24",
    "01047755749",
    "474968@naver.com"
  ),
  createData(
    6,
    false,
    "mihye0924",
    "1234",
    "조미혜",
    "1997.09.24",
    "01047755749",
    "474968@naver.com"
  ),
  createData(
    7,
    false,
    "mihye0924",
    "1234",
    "조미혜",
    "1997.09.24",
    "01047755749",
    "474968@naver.com"
  ),
  createData(
    8,
    false,
    "mihye0924",
    "1234",
    "조미혜",
    "1997.09.24",
    "01047755749",
    "474968@naver.com"
  ),
];

function createData(
  num: number,
  check: boolean,
  userId: string,
  userPw: string,
  userName: string,
  userBirth: string,
  userPhone: string,
  userEmail: string
): Data {
  return {
    num,
    check,
    userId,
    userPw,
    userName,
    userBirth,
    userPhone,
    userEmail,
  };
}
