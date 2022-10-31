import { useCallback } from "react";
import { useRecoilCallback, useSetRecoilState } from "recoil";
import { drawModeState } from "../states/drawModeState";
import {
  moveModeState,
  multiSelectModeState,
  selectModeState,
} from "../states/selectModeState";

export const useSelectMode = () => {
  const setSelectMode = useSetRecoilState(selectModeState);
  const setMoveMode = useSetRecoilState(moveModeState);
  const setMultiSelectMode = useSetRecoilState(multiSelectModeState);

  const resetSelectMode = useCallback(() => {
    setSelectMode("normal");
    setMoveMode("move");
  }, [setMoveMode, setSelectMode]);

  const toMultiSelectMode = useRecoilCallback(
    ({ snapshot }) =>
      () => {
        if (!snapshot.getLoadable(multiSelectModeState).getValue()) {
          setMultiSelectMode(true);
          return true;
        }
        return false;
      },
    [setMultiSelectMode]
  );

  const toNormalSelectMode = useRecoilCallback(
    ({ snapshot }) =>
      () => {
        if (snapshot.getLoadable(multiSelectModeState).getValue()) {
          setMultiSelectMode(false);
          return true;
        }
        return false;
      },
    [setMultiSelectMode]
  );

  const toRangeSelectMode = useRecoilCallback(
    ({ snapshot }) =>
      () => {
        if (
          snapshot.getLoadable(drawModeState).getValue() === "selector" &&
          snapshot.getLoadable(selectModeState).getValue() === "normal"
        ) {
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
        if (
          snapshot.getLoadable(drawModeState).getValue() === "selector" &&
          snapshot.getLoadable(selectModeState).getValue() === "normal"
        ) {
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
    toMultiSelectMode,
    toNormalSelectMode,
    resetSelectMode,
    toRangeSelectMode,
    toMoveSelectMode,
    toMoveMode,
    toCopyMode,
  };
};
