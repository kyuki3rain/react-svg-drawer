import { useCallback } from "react";
import { useRecoilValue } from "recoil";
import { vp } from "../helpers/virtualPoint";
import { areaConfigState } from "../states/areaConfigState";
import { useOnClickObject } from "./useOnClickObject";

type Props = {
  obj: SvgObject;
  parentPoint: VirtualPoint;
  parentId?: SvgId | "preview" | "select";
};

export const useObject = ({ obj, parentPoint, parentId }: Props) => {
  const { onClickObject, onMouseDownObject, onMouseUpObject } =
    useOnClickObject();
  const { pitch } = useRecoilValue(areaConfigState);

  const toRealAbsolute = useCallback(
    (a: VirtualAbsolute) =>
      obj.fixedPoint &&
      vp.toReal(vp.add(vp.add(a, obj.fixedPoint), parentPoint), pitch),
    [obj.fixedPoint, parentPoint, pitch]
  );
  const toRealRelative = useCallback(
    (r: VirtualRelative) => vp.toReal(r, pitch),
    [pitch]
  );

  const onClick = useCallback(
    (stopPropagation: () => void, isSelected: boolean, isShift: boolean) => {
      console.log("onClick ", obj.id);

      const id = obj.id;
      if (!id) return;
      if (id === "preview" || id === "select") return;
      if (parentId === "preview") return;
      if (onClickObject(id, isSelected, isShift)) stopPropagation();
    },
    [obj.id, onClickObject, parentId]
  );

  const onMouseDown = useCallback(
    (
      stopPropagation: () => void,
      isSelected: boolean,
      x: number,
      y: number
    ) => {
      console.log("onMouseDown", obj.id);
      if (onMouseDownObject(isSelected, x, y)) stopPropagation();
    },
    [obj.id, onMouseDownObject]
  );

  const onMouseUp = useCallback(
    (stopPropagation: () => void) => {
      console.log("onMouseUp", obj.id);

      if (onMouseUpObject()) stopPropagation();
    },
    [obj.id, onMouseUpObject]
  );

  const pointToText = useCallback(
    (r?: RealPoint) => (r ? `${r.x},${r.y}` : ""),
    []
  );

  return {
    toRealAbsolute,
    toRealRelative,
    onClick,
    onMouseDown,
    onMouseUp,
    pointToText,
  };
};
