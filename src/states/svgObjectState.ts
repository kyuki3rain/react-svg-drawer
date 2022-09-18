import { nanoid } from "nanoid";
import { useCallback } from "react";
import {
  atom,
  atomFamily,
  DefaultValue,
  selector,
  useRecoilCallback,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import * as vp from "../helpers/virtualPoint";

export const svgObjectStates = atomFamily<SvgObject | null, SvgId | "preview">({
  key: "svgObjectStates",
  default: () => {
    return null;
  },
});
export const svgObjectListState = atom<Set<SvgId>>({
  key: "svgObjectListState",
  default: new Set(),
});

export const allSvgObjectSelector = selector({
  key: "objectView",
  get: ({ get }) =>
    [...get(svgObjectListState)].map((id) => get(svgObjectStates(id))),
  set: ({ get, set, reset }, newValue) => {
    if (newValue instanceof DefaultValue) {
      [...get(svgObjectListState)].map((id) => reset(svgObjectStates(id)));
      set(svgObjectListState, new Set());
      return;
    }

    const idList = newValue
      .map((obj) => {
        if (!obj?.id || obj.id == "preview") return;
        set(svgObjectStates(obj.id), obj);
        return obj.id;
      })
      .flatMap((x) => x ?? []);

    set(svgObjectListState, new Set(idList));
  },
});

export const useSetSvgObject = (id = nanoid() as SvgId | "preview") => {
  const setSvgObject = useSetRecoilState(svgObjectStates(id));
  const setSvgObjectList = useSetRecoilState(svgObjectListState);

  const deleteSvgObject = useCallback(() => {
    setSvgObject(null);
    if (id !== "preview") {
      setSvgObjectList((prev) => {
        prev.delete(id);
        return new Set(prev);
      });
    }
  }, [id, setSvgObject, setSvgObjectList]);

  const addOrUpdateSvgObject = useCallback(
    (obj: SvgObject) => {
      setSvgObject((prev) => {
        if (prev?.type === obj.type) return { ...prev, ...obj, id };

        return { ...obj, id };
      });
      if (id !== "preview") {
        setSvgObjectList((prev) => new Set(prev.add(id)));
      }
    },
    [id, setSvgObject, setSvgObjectList]
  );

  return {
    addOrUpdateSvgObject,
    deleteSvgObject,
  };
};

export const useSvgObject = (id: SvgId | "preview") => {
  const svgObject = useRecoilValue(svgObjectStates(id));
  const setSvgObject = useSetSvgObject(id);
  return {
    svgObject,
    ...setSvgObject,
  };
};

export const useSetSvgObjectList = () => {
  const setSvgObjectList = useSetRecoilState(svgObjectListState);

  const addIds = useCallback(
    (ids: SvgId[]) => {
      setSvgObjectList((prev) => {
        ids.map((id) => prev.add(id));
        return new Set(prev);
      });
    },
    [setSvgObjectList]
  );

  const deleteIds = useCallback(
    (ids: SvgId[]) => {
      setSvgObjectList((prev) => {
        ids.map((id) => prev.delete(id));
        return new Set(prev);
      });
    },
    [setSvgObjectList]
  );

  return {
    addIds,
    deleteIds,
  };
};

export const useSvgObjects = () => {
  const updateFixedPoint = useRecoilCallback(
    ({ set }) =>
      (ids: SvgId[], correction: VirtualPoint) => {
        {
          ids.map((id) =>
            set(svgObjectStates(id), (prev) => {
              if (!prev) return prev;
              if (!prev.fixedPoint) return prev;
              return (
                prev && {
                  ...prev,
                  fixedPoint: vp.sub(prev.fixedPoint, correction),
                }
              );
            })
          );
        }
      },
    []
  );

  const copySvgObjects = useRecoilCallback(
    ({ set, snapshot }) =>
      (ids: SvgId[]) =>
        ids
          .map((id) => {
            const svgObject = snapshot
              .getLoadable(svgObjectStates(id))
              .getValue();
            if (!svgObject) return;

            const newId = nanoid() as SvgId;
            set(svgObjectStates(newId), { ...svgObject, id: newId });
            return newId;
          })
          .flatMap((x) => x ?? []),
    []
  );

  const deleteObjects = useRecoilCallback(
    ({ set }) =>
      (ids: SvgId[]) => {
        ids.map((id) => {
          set(svgObjectStates(id), null);
        });
      },
    []
  );

  const getObjects = useRecoilCallback(
    ({ snapshot }) =>
      (ids: SvgId[]) =>
        ids.map((id) => {
          const svgObject = snapshot
            .getLoadable(svgObjectStates(id))
            .getValue();
          return svgObject;
        }),
    []
  );

  const resetPreviewGroup = useRecoilCallback(
    ({ set, snapshot }) =>
      () => {
        const obj = snapshot.getLoadable(svgObjectStates("preview")).getValue();

        if (!obj || obj.type !== "group" || !obj.fixedPoint) return;

        if (obj.isCopy) {
          obj.objectIds.map((id) => {
            set(svgObjectStates(id), null);
          });
        } else {
          const correction = vp.sub(vp.create(0, 0), obj.firstFixedPoint);
          obj.objectIds.map((id) =>
            set(svgObjectStates(id), (prev) => {
              if (!prev) return prev;
              if (!prev.fixedPoint) return prev;
              return (
                prev && {
                  ...prev,
                  fixedPoint: vp.sub(prev.fixedPoint, correction),
                }
              );
            })
          );
          set(svgObjectListState, (prev) => {
            obj.objectIds.map((id) => prev.add(id));
            return new Set(prev);
          });
        }
      },
    []
  );

  return {
    resetPreviewGroup,
    updateFixedPoint,
    copySvgObjects,
    deleteObjects,
    getObjects,
  };
};
