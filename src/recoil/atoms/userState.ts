import { atom } from "recoil"; 
import { recoilPersist } from 'recoil-persist';
 
const { persistAtom } = recoilPersist();

interface userType { 
  isAuth: boolean;
  user_id: string; 
  role: number;
  token?: string;  
  account_name?: string
}

export const userState = atom<userType>({
  key: "userState",
  default: { 
    isAuth: false,
    user_id: '', 
    role: 0,
    token: '',
    account_name: ''
  },
  effects_UNSTABLE: [persistAtom],
})