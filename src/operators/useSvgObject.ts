import { nanoid } from "nanoid";
import { useRecoilCallback } from "recoil";
import { vp } from "../helpers/virtualPoint";
import { svgObjectListState, svgObjectStates } from "../states/svgObjectState";

export const useSvgObject = () => {
  const deleteObject = useRecoilCallback(
    ({ snapshot, set }) =>
      (id: SvgId, deep?: boolean) => {
        const svgObject = snapshot.getLoadable(svgObjectStates(id)).getValue();
        if (!svgObject) return;

        if (deep && svgObject.type === "group") {
          svgObject.objectIds.map((cid) => deleteObject(cid));
        }

        set(svgObjectStates(id), null);
        set(svgObjectListState, (prev) => {
          prev.delete(id);
          return new Set(prev);
        });
      },
    []
  );

  const addObject = useRecoilCallback(
    ({ snapshot, set }) =>
      (obj: SvgObject, id?: SvgId) => {
        let newId = id || (nanoid() as SvgId);
        const list = snapshot.getLoadable(svgObjectListState).getValue();
        if (list.has(newId)) {
          newId = nanoid() as SvgId;
          if (obj.fixedPoint)
            obj.fixedPoint = vp.add(
              obj.fixedPoint,
              vp.one()
            ) as VirtualAbsolute;
        }
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
      (id: SvgId, setNewId?: boolean, withSave?: boolean) => {
        const svgObject = snapshot.getLoadable(svgObjectStates(id)).getValue();
        if (!svgObject) return;

        const newId = (setNewId ? nanoid() : `copy/${id}`) as SvgId;
        if (svgObject.type === "group") {
          const objectIds = svgObject.objectIds.flatMap(
            (id) => copyObject(id, setNewId) ?? []
          );
          set(svgObjectStates(newId), { ...svgObject, id: newId, objectIds });
        } else {
          set(svgObjectStates(newId), { ...svgObject, id: newId });
        }

        if (withSave)
          set(svgObjectListState, (prev) => new Set(prev.add(newId)));

        return newId;
      },
    []
  );

  const removeTagFromId = useRecoilCallback(
    ({ snapshot, set }) =>
      (id: SvgId, tagType: "copy") => {
        const [tag, beforeId] = id.split("/");
        if (tag !== tagType) return;

        const svgObject = snapshot.getLoadable(svgObjectStates(id)).getValue();
        if (!svgObject) return;

        const newId = beforeId as SvgId;
        if (svgObject.type === "group") {
          const objectIds = svgObject.objectIds.flatMap(
            (id) => removeTagFromId(id, tagType) ?? []
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
    removeTagFromId,
  };
};
