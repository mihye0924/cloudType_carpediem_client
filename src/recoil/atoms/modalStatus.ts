import { WriteType } from "@/types/common";
import { atom } from "recoil";

export const profileModalStatus = atom<boolean>({
  key: "profileModalStatus",
  default: false,
});

export const writeModalStatus = atom<WriteType>({
  key: "writeModalStatus",
  default: {
    modal: false,
    step: 1,
  },
});

export const replyModalStatus = atom<boolean>({
  key: "replyModalStatus",
  default: false,
});

export const listModalStatus = atom<boolean>({
  key: "listModalStatus",
  default: false,
});

export const menuDrawerStatus = atom<boolean>({
  key: "menuDrawerStatus",
  default: false,
});
