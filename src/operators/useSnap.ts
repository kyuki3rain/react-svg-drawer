import { useRecoilCallback } from "recoil";
import { snapGridState } from "../states/snapGridState";

export const useSnap = () => {
  const toggleSnap = useRecoilCallback(({ set }) => () => {
    set(snapGridState, (prev) => !prev);
  });

  return { toggleSnap };
};
