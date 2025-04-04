export interface Column {
  id:
    | "num"
    | "check"
    | "userId"
    | "userPw"
    | "userName"
    | "userBirth"
    | "userPhone"
    | "userEmail";
  label: string;
  minWidth?: number;
  align?: "center" | "right" | "left";
  custom?: boolean;
}

export interface Data {
  num: number;
  check: boolean;
  userId: string;
  userPw: string;
  userName: string;
  userBirth: string;
  userPhone: string;
  userEmail: string;
}
