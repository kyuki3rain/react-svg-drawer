import { useRecoilCallback } from "recoil";
import { drawModeState } from "../states/drawModeState";
import { useSelect } from "./useSelect";

export const useOnClickObject = () => {
  const { toggleSelect } = useSelect();

  const onClick = useRecoilCallback(
    ({ snapshot }) =>
      (id: SvgId) => {
        const drawMode = snapshot.getLoadable(drawModeState).getValue();
        if (drawMode !== "selector") return false;

        toggleSelect(id);

        return true;
      },
    [toggleSelect]
  );

  return {
    onClick,
  };
};
