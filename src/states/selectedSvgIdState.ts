import { atom, useRecoilValue, useSetRecoilState } from "recoil";

const selectedSvgIdState = atom<Set<SvgId>>({
  key: "selectedSvgIdState",
  default: new Set(),
});

export const useSetSelectedSvgId = () => {
  const setSelectedSvgId = useSetRecoilState(selectedSvgIdState);

  const select = (id: SvgId) => {
    setSelectedSvgId((prev) => new Set(prev.add(id)));
  };

  const unselect = (id: SvgId) => {
    setSelectedSvgId((prev) => {
      prev.delete(id);
      return new Set(prev);
    });
  };

  const toggleSelect = (id: SvgId) => {
    setSelectedSvgId((prev) => {
      console.log(prev);
      if (prev.has(id)) {
        prev.delete(id);
        return new Set(prev);
      } else return new Set(prev.add(id));
    });
  };

  const resetSelect = () => {
    setSelectedSvgId(new Set());
  };

  return {
    select,
    unselect,
    toggleSelect,
    resetSelect,
  };
};

export const useSelectedSvgId = () => {
  const selectedSvgId = useRecoilValue(selectedSvgIdState);
  const setSelectedSvgId = useSetSelectedSvgId();

  return {
    selectedSvgId,
    ...setSelectedSvgId,
  };
};
