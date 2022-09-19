import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { useResetPreview } from "../operators/useResetPreview";
import { drawModeState } from "../states/drawModeState";

export const useResetPreviewEffects = () => {
  const { resetPreview } = useResetPreview();
  const drawMode = useRecoilValue(drawModeState);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => resetPreview(), [drawMode]);
};
