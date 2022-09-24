import { useCallback } from "react";
import { useRecoilValue } from "recoil";
import { vp } from "../helpers/virtualPoint";
import { areaConfigState } from "../states/areaConfigState";
import { useOnClickObject } from "./useOnClickObject";

type Props = {
  obj: SvgObject;
  parentPoint: VirtualPoint;
  parentId?: SvgId | "preview";
};

export const useObject = ({ obj, parentPoint, parentId }: Props) => {
  const { onClickObject } = useOnClickObject();
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
