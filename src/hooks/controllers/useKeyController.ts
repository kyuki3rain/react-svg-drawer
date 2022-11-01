import { useEffect, useRef } from "react";
import { useRecoilCallback, useSetRecoilState } from "recoil";
import { useResetPreview } from "../../operators/useResetPreview";
import { useSelect } from "../../operators/useSelect";
import { useSelectMode } from "../../operators/useSelectMode";
import { keyControllerRefState } from "../../states/keyControllerRefState";
import { snapGridState } from "../../states/snapGridState";
import { useFunctionButton } from "../buttons/useFunctionButton";

export const useKeyController = () => {
  const { resetPreview } = useResetPreview();
  const { resetSelect } = useSelect();
  const { toMoveMode, toCopyMode, toMultiSelectMode, toNormalSelectMode } =
    useSelectMode();
  const { undo, redo } = useFunctionButton();

  const ref = useRef<HTMLDivElement>(null);
  const setRef = useSetRecoilState(keyControllerRefState);

  useEffect(() => setRef(ref), [setRef]);

  const onKeyUp = useRecoilCallback(
    ({ set }) =>
      (key: string) => {
        switch (key) {
          case "Control":
            toMoveMode();
            break;
          case "Shift":
            toNormalSelectMode();
            break;
          case "Alt":
            set(snapGridState, true);
            break;
          default:
        }
      },
    [toMoveMode, toNormalSelectMode]
  );

  const onKeyDown = useRecoilCallback(
    ({ set }) =>
      (key: string, ctrl: boolean, shift: boolean) => {
        switch (key) {
          case "z":
            if (shift && ctrl) redo();
            else if (ctrl) undo();
            break;
          case "Escape":
            resetPreview();
            resetSelect();
            break;
          case "Control":
            toCopyMode();
            break;
          case "Shift":
            toMultiSelectMode();
            break;
          case "Alt":
            set(snapGridState, false);
            break;
          default:
        }
      },
    [redo, resetPreview, resetSelect, toCopyMode, toMultiSelectMode, undo]
  );

  return {
    onKeyDown,
    onKeyUp,
    ref,
  };
};
