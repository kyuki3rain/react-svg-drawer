import { nanoid } from "nanoid";
import {
  atom,
  atomFamily,
  DefaultValue,
  selector,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";

const svgObjectStates = atomFamily<SvgObject | null, SvgId | "preview">({
  key: "svgObjectStates",
  default: () => {
    console.log("create new SvgObject");
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

export const useSetSvgObject = (id = nanoid() as SvgId | "preview") => {
  const setSvgObject = useSetRecoilState(svgObjectStates(id));
  const setSvgObjectList = useSetRecoilState(svgObjectListState);

  const deleteSvgObject = () => {
    setSvgObject(null);
    if (id !== "preview")
      setSvgObjectList((prev) => {
        prev.delete(id);
        return new Set(prev);
      });
  };

  const addOrUpdateSvgObject = (obj: SvgObject) => {
    setSvgObject((prev) => {
      if (prev?.type === obj.type) return { ...prev, ...obj, id };

      return { ...obj, id };
    });
    if (id !== "preview") setSvgObjectList((prev) => new Set(prev.add(id)));
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

export const useSvgObjectList = () => {
  const svgObjectList = useRecoilValue(svgObjectListState);
  return {
    svgObjectList,
  };
};
