import { atom } from "recoil";
import { ProfileType } from "@/recoil/types/profile";

export const profileStatus = atom<ProfileType>({
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
    account_badge: 0,
  },
});
