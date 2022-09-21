import { nanoid } from "nanoid";
import { useRecoilCallback } from "recoil";
import { svgObjectListState, svgObjectStates } from "../states/svgObjectState";

export const useSvgObject = () => {
  const deleteObject = useRecoilCallback(
    ({ set }) =>
      (id: SvgId) => {
        set(svgObjectStates(id), null);
        set(svgObjectListState, (prev) => {
          prev.delete(id);
          return new Set(prev);
        });
      },
    []
  );

  const addObject = useRecoilCallback(
    ({ set }) =>
      (obj: SvgObject, newId: SvgId = nanoid() as SvgId) => {
        set(svgObjectStates(newId), (prev) => {
          if (!prev) return { ...obj, id: newId };
          return prev;
        });
        set(svgObjectListState, (prev) => new Set(prev.add(newId)));
        return newId;
      }
  );

  const updateObject = useRecoilCallback(
    ({ set }) =>
      (obj: SvgObject) => {
        if (!obj.id || obj.id === "preview") return;
        set(svgObjectStates(obj.id), obj);
      },
    []
  );

  return {
    deleteObject,
    addObject,
    updateObject,
  };
};
