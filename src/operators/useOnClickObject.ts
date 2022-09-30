import { useRecoilCallback } from "recoil";
import { drawModeState } from "../states/drawModeState";
import { useSelect } from "./useSelect";

export const useOnClickObject = () => {
  const { select, unselect } = useSelect();

  const onClickObject = useRecoilCallback(
    ({ snapshot }) =>
      (id: SvgId, isSelected: boolean, isShift: boolean) => {
        const drawMode = snapshot.getLoadable(drawModeState).getValue();
        if (drawMode !== "selector") return false;

        if (isSelected) {
          if (isShift) unselect(id);
        } else select(id, isShift);

        return true;
      },
    [select, unselect]
  );

  return {
    onClickObject,
  };
};
