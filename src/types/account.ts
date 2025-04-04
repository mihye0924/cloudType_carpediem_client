export interface AccountType {
  user_id: "";
  account_no: 0;
  account_name: "";
  account_profile: "";
  account_info: "";
  account_link: "";
}

export interface ProfileType {
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
