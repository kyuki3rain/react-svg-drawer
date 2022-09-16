import { nanoid } from "nanoid";
import {
  atom,
  atomFamily,
  DefaultValue,
  selector,
  useRecoilCallback,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import * as vp from "../helpers/virtualPoint";

const svgObjectStates = atomFamily<SvgObject | null, SvgId | "preview">({
  key: "svgObjectStates",
  default: () => {
    return null;
  },
});
const svgObjectListState = atom<Set<SvgId>>({
  key: "svgObjectListState",
  default: new Set(),
});

const allSvgObjectSelector = selector({
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

export const useAllSvgObject = () => {
  return useRecoilState(allSvgObjectSelector);
};
export const useSetAllSvgObject = () => {
  return useSetRecoilState(allSvgObjectSelector);
};

export const useSetSvgObject = (id = nanoid() as SvgId | "preview") => {
  const setSvgObject = useSetRecoilState(svgObjectStates(id));
  const setSvgObjectList = useSetRecoilState(svgObjectListState);

  const deleteSvgObject = () => {
    setSvgObject(null);
    if (id !== "preview") {
      setSvgObjectList((prev) => {
        prev.delete(id);
        return new Set(prev);
      });
    }
  };

  const addOrUpdateSvgObject = (obj: SvgObject) => {
    setSvgObject((prev) => {
      if (prev?.type === obj.type) return { ...prev, ...obj, id };

      return { ...obj, id };
    });
    if (id !== "preview") {
      setSvgObjectList((prev) => new Set(prev.add(id)));
    }
  };

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

  const addIds = (ids: SvgId[]) => {
    setSvgObjectList((prev) => {
      ids.map((id) => prev.add(id));
      return new Set(prev);
    });
  };

  const deleteIds = (ids: SvgId[]) => {
    setSvgObjectList((prev) => {
      ids.map((id) => prev.delete(id));
      return new Set(prev);
    });
  };

  return {
    addIds,
    deleteIds,
  };
};

export const useSvgObjectList = () => {
  const svgObjectList = useRecoilValue(svgObjectListState);
  return {
    svgObjectList,
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

  return {
    updateFixedPoint,
    copySvgObjects,
    deleteObjects,
    getObjects,
  };
};
