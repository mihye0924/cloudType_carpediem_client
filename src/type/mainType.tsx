 
export const DataInital = { 
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
  list_no: "",
  list_image: {},
  list_content: "",
  list_good: 0,
  list_reply: {},
  list_date: new Date()
} 

export interface DataType { 
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
    list_no: string;
    list_image: object;
    list_content: string;
    list_good: number;
    list_reply: object;
    list_date: Date; 
}