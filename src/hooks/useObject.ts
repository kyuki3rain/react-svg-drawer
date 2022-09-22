import { useCallback } from "react";
import { vp } from "../helpers/virtualPoint";
import { useOnClickObject } from "../operators/useOnClickObject";
import { usePoint } from "../operators/usePoint";

type Props = {
  obj: SvgObject;
  parentPoint: VirtualPoint;
  parentId?: SvgId | "preview";
};

export const useObject = ({ obj, parentPoint, parentId }: Props) => {
  const { toReal } = usePoint();
  const { onClickObject } = useOnClickObject();

  const toRealAbsolute = useCallback(
    (a: VirtualPoint) =>
      obj.fixedPoint && toReal(vp.add(vp.add(a, obj.fixedPoint), parentPoint)),
    [obj.fixedPoint, parentPoint, toReal]
  );
  const toRealRelative = useCallback((r: VirtualPoint) => toReal(r), [toReal]);

  const onClick = useCallback(
    (stopPropagation: () => void) => {
      const id = parentId ?? obj.id;
      if (!id) return;
      if (id === "preview") return;
      if (onClickObject(id)) stopPropagation;
    },
    [obj.id, onClickObject, parentId]
  );

  const pointToText = useCallback(
    (r?: RealPoint) => (r ? `${r.x},${r.y}` : ""),
    []
  );

  return {
    toRealAbsolute,
    toRealRelative,
    onClick,
    pointToText,
  };
};
