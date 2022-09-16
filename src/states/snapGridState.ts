import { useCallback } from "react";
import { atom, useRecoilValue, useSetRecoilState } from "recoil";

const snapGridState = atom({
  key: "snapGridState",
  default: true,
});

export const useSetSnapGrid = () => {
  const setSnapGrid = useSetRecoilState(snapGridState);

  const toggleSnapGrid = useCallback(
    () => setSnapGrid((prev) => !prev),
    [setSnapGrid]
  );
  const snapGridOff = useCallback(() => setSnapGrid(false), [setSnapGrid]);
  const snapGridOn = useCallback(() => setSnapGrid(true), [setSnapGrid]);

  return {
    toggleSnapGrid,
    snapGridOff,
    snapGridOn,
  };
};

export const useSnapGrid = () => {
  const snapGrid = useRecoilValue(snapGridState);
  const setSnapGrid = useSetSnapGrid();

  return {
    snapGrid,
    ...setSnapGrid,
  };
};
