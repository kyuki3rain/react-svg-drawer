import { useCallback } from "react";
import { useDrawMode } from "../states/drawModeState";
import { useSetSelectedSvgId } from "../states/selectedSvgIdState";

export const useSelect = () => {
  const { drawMode } = useDrawMode();
  const { toggleSelect } = useSetSelectedSvgId();

  const onClick = useCallback(
    (id?: SvgId | "preview") => {
      if (!id) return false;
      if (id === "preview") return false;
      if (drawMode.mode !== "selector") return false;

      toggleSelect(id);

      return true;
    },
    [drawMode.mode, toggleSelect]
  );

  return {
    onClick,
  };
};
