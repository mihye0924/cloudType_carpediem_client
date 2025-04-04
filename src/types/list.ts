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

export interface listType {
  user_id: string;
  account_no: number;
  account_name: string;
  account_profile: string;
  account_info: string;
  account_link: string;
  account_list_num: number;
  account_followers: number;
  account_following: number;
  account_badge: number;
  list_no: number;
  list_image: {
    id: number;
    img: string;
  }[];
  list_content: string;
  list_good_count: number;
  list_good_save: {
    good_no: number;
    account_name: string;
    good_checked: boolean;
  }[];
  list_bookmark: number;
  list_reply: object;
  list_date: Date;
}
