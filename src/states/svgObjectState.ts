import { nanoid } from "nanoid";
import { atom, atomFamily, useRecoilValue, useSetRecoilState } from "recoil";

const svgObjectStates = atomFamily<SvgObject | null, SvgId>({
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

export const useSvgObject = (id: SvgId) => {
  const svgObject = useRecoilValue(svgObjectStates(id));
  return {
    svgObject,
  };
};

export const useSvgObjectList = () => {
  const svgObjectList = useRecoilValue(svgObjectListState);
  return {
    svgObjectList,
  };
};

export const useSetSvgObject = (id = nanoid() as SvgId) => {
  const setSvgObject = useSetRecoilState(svgObjectStates(id));
  const setSvgObjectList = useSetRecoilState(svgObjectListState);

  const addOrUpdateLineObject = (line: LineObject) => {
    setSvgObject((prev) => ({ ...prev, ...line, id, type: "line" }));
    setSvgObjectList((prev) => new Set(prev.add(id)));
  };

  const deleteSvgObject = () => {
    setSvgObject(null);
    setSvgObjectList((prev) => {
      prev.delete(id);
      return new Set(prev);
    });
  };

  const addOrUpdateSvgObject = (obj: SvgObject) => {
    switch (obj.type) {
      case "line":
        addOrUpdateLineObject(obj);
    }
  };

  return {
    addOrUpdateSvgObject,
    deleteSvgObject,
  };
};
