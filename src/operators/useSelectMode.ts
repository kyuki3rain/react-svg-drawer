import { useCallback } from "react";
import { useRecoilCallback, useSetRecoilState } from "recoil";
import { moveModeState, selectModeState } from "../states/selectModeState";

export const useSelectMode = () => {
  const setSelectMode = useSetRecoilState(selectModeState);
  const setMoveMode = useSetRecoilState(moveModeState);

  const resetSelectMode = useCallback(() => {
    setSelectMode("normal");
    setMoveMode("move");
  }, [setMoveMode, setSelectMode]);

  const toRangeSelectMode = useCallback(
    () => setSelectMode("range"),
    [setSelectMode]
  );

  const toMoveSelectMode = useCallback(
    () => setSelectMode("move"),
    [setSelectMode]
  );

  const toMoveMode = useRecoilCallback(
    ({ snapshot }) =>
      () => {
        if (snapshot.getLoadable(moveModeState).getValue() == "move")
          setMoveMode("move");
      },
    [setMoveMode]
  );

  const toCopyMode = useRecoilCallback(
    ({ snapshot }) =>
      () => {
        if (snapshot.getLoadable(moveModeState).getValue() == "move")
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
