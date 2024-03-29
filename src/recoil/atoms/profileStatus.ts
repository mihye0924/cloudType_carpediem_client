import { atom } from "recoil";

export interface profileType {
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
}
 

export const profileStatus = atom<profileType>({
  key: "profileStatus",
  default: { 
    user_id: "",
    account_profile: "profile-dummy.svg",
    account_name: "",
    account_no: 0,
    account_info: "",
    account_link: "",
    account_list_num: 0,
    account_followers: 0,
    account_following: 0,
    account_badge: 0
  }, 
})