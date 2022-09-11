import { atom, useRecoilValue, useSetRecoilState } from "recoil";

const snapGridState = atom({
  key: "snapGridState",
  default: true,
});

export const useSetSnapGrid = () => {
  const setSnapGrid = useSetRecoilState(snapGridState);

  const toggleSnapGrid = () => setSnapGrid((prev) => !prev);
  const snapGridOff = () => setSnapGrid(false);
  const snapGridOn = () => setSnapGrid(true);

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
