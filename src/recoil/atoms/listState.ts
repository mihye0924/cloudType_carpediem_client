import { listType } from "@/types/list";
import { atom } from "recoil";

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
          img: "",
        },
      ],
      list_content: "",
      list_good_count: 0,
      list_good_save: [
        {
          good_no: 0,
          account_name: "",
          good_checked: false,
        },
      ],
      list_bookmark: 0,
      list_reply: {},
      list_date: new Date(),
    },
  ],
});
