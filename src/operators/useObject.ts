import { useCallback, useMemo } from "react";
import { useRecoilValue } from "recoil";
import { vp } from "../helpers/virtualPoint";
import { areaConfigState } from "../states/areaConfigState";
import { useKeyControllerRef } from "./useKeyControllerRef";
import { useOnClickObject } from "./useOnClickObject";

type Props = {
  obj: SvgObject;
  parentPoint: VirtualPoint;
  parentId?: SvgId | "preview";
};

export const useObject = ({ obj, parentPoint, parentId }: Props) => {
  const { onClickObject, onMouseDownObject } = useOnClickObject();
  const { pitch } = useRecoilValue(areaConfigState);
  const { focus } = useKeyControllerRef();

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
    (stopPropagation: () => void) => {
      const id = parentId ?? obj.id;
      if (!id) return;
      if (id === "preview") return;
      if (onClickObject(id)) {
        stopPropagation();
        focus();
      }
    },
    [focus, obj.id, onClickObject, parentId]
  );

  const onMouseDown = useCallback(
    (
      stopPropagation: () => void,
      x: number,
      y: number,
      isSelected: boolean
    ) => {
      const id = parentId ?? obj.id;
      if (!id) return;
      if (id === "preview") return;
      if (onMouseDownObject(x, y, isSelected)) {
        stopPropagation();
        focus();
      }
    },
    [focus, obj.id, onMouseDownObject, parentId]
  );

  const pointToText = useCallback(
    (r?: RealPoint) => (r ? `${r.x},${r.y}` : ""),
    []
  );

  const style = useMemo(() => {
    switch (obj.type) {
      case "group":
      case "node":
      case "edge":
        return null;
      case "text":
        return {
          ...obj.style,
          strokeWidth: obj.style.strokeWidth && obj.style.strokeWidth * pitch,
          fontSize: obj.style.fontSize && obj.style.fontSize * pitch,
        };
      default:
        return {
          ...obj.style,
          strokeWidth: obj.style.strokeWidth && obj.style.strokeWidth * pitch,
        };
    }
  }, [obj, pitch]);

  return {
    toRealAbsolute,
    toRealRelative,
    onClick,
    onMouseDown,
    pointToText,
    style,
  };
};
