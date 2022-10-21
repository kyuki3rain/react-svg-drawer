import { useRecoilCallback } from "recoil";
import { drawModeState } from "../states/drawModeState";
import { useSelect } from "./useSelect";
import { useSelectMode } from "./useSelectMode";

export const useOnClickObject = () => {
  const { toggleSelect } = useSelect();
  const { toMoveSelectMode } = useSelectMode();

  const onClickObject = useRecoilCallback(
    ({ snapshot }) =>
      (id: SvgId) => {
        const drawMode = snapshot.getLoadable(drawModeState).getValue();
        if (drawMode !== "selector") return false;

        toggleSelect(id);

        return true;
      },
    [toggleSelect]
  );

  const onMouseDownObject = useRecoilCallback(
    ({ snapshot }) =>
      (isSelected: boolean) => {
        const drawMode = snapshot.getLoadable(drawModeState).getValue();
        if (drawMode !== "selector") return false;
        if (!isSelected) return false;

        toMoveSelectMode();

        return true;
      },
    [toMoveSelectMode]
  );

  return {
    onClickObject,
    onMouseDownObject,
  };
};
