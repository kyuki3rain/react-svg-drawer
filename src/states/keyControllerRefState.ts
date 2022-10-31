import { RefObject } from "react";
import { atom } from "recoil";

export const keyControllerRefState = atom<RefObject<HTMLDivElement> | null>({
  key: "keyControllerRefState",
  default: null,
});
