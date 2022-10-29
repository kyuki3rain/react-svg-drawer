import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { moveModeState, selectModeState } from "../states/selectModeState";

export const useDebugInfoEffect = () => {
  const selectMode = useRecoilValue(selectModeState);
  const moveMode = useRecoilValue(moveModeState);

  useEffect(() => console.log("selectMode: ", selectMode), [selectMode]);
  useEffect(() => console.log("moveMode: ", moveMode), [moveMode]);
};
