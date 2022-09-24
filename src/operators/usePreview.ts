import { useCallback } from "react";
import { useSetRecoilState } from "recoil";
import { svgObjectStates } from "../states/svgObjectState";

export const usePreview = () => {
  const setSvgObject = useSetRecoilState(svgObjectStates("preview"));

  const deletePreview = useCallback(() => {
    setSvgObject(null);
  }, [setSvgObject]);

  const updatePreview = useCallback(
    (obj: SvgObject) => {
      setSvgObject((prev) => {
        if (prev?.type === obj.type) return { ...prev, ...obj, id: "preview" };

        return { ...obj, id: "preview" };
      });
    },
    [setSvgObject]
  );

  return {
    updatePreview,
    deletePreview,
  };
};
