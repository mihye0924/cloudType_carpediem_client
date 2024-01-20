 
 
import { atom } from "recoil";  
  
interface writeType {
  modal: boolean,
  step: number
}

export const profileModalStatus = atom<boolean>({
  key: "profileModalStatus",
  default: false
})


export const WriteModalStatus = atom<writeType>({
  key: "WriteModalStatus",
  default: {
    modal: false,
    step: 1
  }
})