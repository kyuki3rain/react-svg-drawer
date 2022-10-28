import { useCallback } from "react";
import { useRecoilCallback, useSetRecoilState } from "recoil";
import { drawModeState } from "../states/drawModeState";
import { moveModeState, selectModeState } from "../states/selectModeState";

export const useSelectMode = () => {
  const setSelectMode = useSetRecoilState(selectModeState);
  const setMoveMode = useSetRecoilState(moveModeState);

  const resetSelectMode = useCallback(() => {
    setSelectMode("normal");
    setMoveMode("move");
  }, [setMoveMode, setSelectMode]);

  const toRangeSelectMode = useRecoilCallback(
    ({ snapshot }) =>
      () => {
        if (snapshot.getLoadable(drawModeState).getValue() === "selector")
          setSelectMode("range");
      },
    [setSelectMode]
  );

  const toMoveSelectMode = useRecoilCallback(
    ({ snapshot }) =>
      () => {
        if (snapshot.getLoadable(drawModeState).getValue() === "selector")
          setSelectMode("move");
      },
    [setSelectMode]
  );

  const toMoveMode = useRecoilCallback(
    ({ snapshot }) =>
      () => {
        if (snapshot.getLoadable(selectModeState).getValue() === "move")
          setMoveMode("move");
      },
    [setMoveMode]
  );

  const toCopyMode = useRecoilCallback(
    ({ snapshot }) =>
      () => {
        if (snapshot.getLoadable(selectModeState).getValue() === "move")
          setMoveMode("copy");
      },
    [setMoveMode]
  );

  return {
    resetSelectMode,
    toRangeSelectMode,
    toMoveSelectMode,
    toMoveMode,
    toCopyMode,
  };
};
