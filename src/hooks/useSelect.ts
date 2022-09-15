import { useDrawMode } from "../states/drawModeState";
import { useSetSelectedSvgId } from "../states/selectedSvgIdState";

export const useSelect = () => {
  const { drawMode } = useDrawMode();
  const { toggleSelect } = useSetSelectedSvgId();

  const onClick = (id?: SvgId | "preview") => {
    if (!id) return false;
    if (id === "preview") return false;
    if (drawMode.mode !== "selector") return false;
    console.log("click");

    toggleSelect(id);

    return true;
  };

  return {
    onClick,
  };
};
