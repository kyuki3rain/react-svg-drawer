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
        if (snapshot.getLoadable(drawModeState).getValue() === "selector") {
          setSelectMode("range");
          return true;
        }
        return false;
      },
    [setSelectMode]
  );

  const toMoveSelectMode = useRecoilCallback(
    ({ snapshot }) =>
      () => {
        if (snapshot.getLoadable(drawModeState).getValue() === "selector") {
          setSelectMode("move");
          return true;
        }
        return false;
      },
    [setSelectMode]
  );

  const toMoveMode = useRecoilCallback(
    ({ snapshot }) =>
      () => {
        if (snapshot.getLoadable(selectModeState).getValue() === "move") {
          setMoveMode("move");
          return true;
        }
        return false;
      },
    [setMoveMode]
  );

  const toCopyMode = useRecoilCallback(
    ({ snapshot }) =>
      () => {
        if (snapshot.getLoadable(selectModeState).getValue() === "move") {
          setMoveMode("copy");
          return true;
        }
        return false;
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
