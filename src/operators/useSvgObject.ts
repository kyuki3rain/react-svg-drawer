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

  const copyObject = useRecoilCallback(
    ({ snapshot, set }) =>
      (id: SvgId) => {
        const svgObject = snapshot.getLoadable(svgObjectStates(id)).getValue();
        if (!svgObject) return;

        const newId = nanoid() as SvgId;
        if (svgObject.type === "group") {
          const objectIds = svgObject.objectIds.flatMap(
            (id) => copyObject(id) ?? []
          );
          set(svgObjectStates(newId), { ...svgObject, id: newId, objectIds });
        } else {
          set(svgObjectStates(newId), { ...svgObject, id: newId });
        }
        return newId;
      },
    []
  );

  return {
    deleteObject,
    addObject,
    updateObject,
    copyObject,
  };
};
