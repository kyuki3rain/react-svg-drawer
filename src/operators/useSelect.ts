import { useRecoilCallback } from "recoil";
import { drawModeState } from "../states/drawModeState";
import { useSetSelectedSvgId } from "../states/selectedSvgIdState";

export const useSelect = () => {
  const { toggleSelect } = useSetSelectedSvgId();

  const onClick = useRecoilCallback(
    ({ snapshot }) =>
      (id?: SvgId | "preview") => {
        const drawMode = snapshot.getLoadable(drawModeState).getValue();
        if (!id) return false;
        if (id === "preview") return false;
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
