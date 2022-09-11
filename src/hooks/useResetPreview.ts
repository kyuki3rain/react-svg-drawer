import { useCallback, useEffect } from "react";
import { useDrawMode } from "../states/drawModeState";
import { useSetSvgObject } from "../states/svgObjectState";

export const useResetPreview = () => {
  const { deleteSvgObject } = useSetSvgObject("preview" as SvgId);
  const { drawMode } = useDrawMode();

  const resetPreview = useCallback(() => deleteSvgObject(), [deleteSvgObject]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => resetPreview(), [drawMode]);

  return {
    resetPreview,
  };
};
