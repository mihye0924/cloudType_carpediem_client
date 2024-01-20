import { atom } from "recoil";

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
    img: string
  }[];
  list_content: string;
  list_good: number;
  list_reply: object;
  list_date: Date
}

export const listStatus = atom<listType[]>({
  key: "listStatus",
  default: [
    {
      user_id: "",
      account_profile: "profile-dummy.svg",
      account_name: "",
      account_no: 0,
      account_info: "",
      account_link: "",
      account_list_num: 0,
      account_followers: 0,
      account_following: 0,
      account_badge: 0,
      list_no: 0,
      list_image: [
        {
          id: 1,
          img: ""
        }
      ],
      list_content: "",
      list_good: 0,
      list_reply: {},
      list_date: new Date
    }
  ] 
})