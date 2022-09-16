import { useCallback } from "react";
import { atom, useRecoilValue, useSetRecoilState } from "recoil";

const selectedSvgIdState = atom<Set<SvgId>>({
  key: "selectedSvgIdState",
  default: new Set(),
});

export const useSetSelectedSvgId = () => {
  const setSelectedSvgId = useSetRecoilState(selectedSvgIdState);

  const select = useCallback(
    (id: SvgId) => {
      setSelectedSvgId((prev) => new Set(prev.add(id)));
    },
    [setSelectedSvgId]
  );

  const unselect = useCallback(
    (id: SvgId) => {
      setSelectedSvgId((prev) => {
        prev.delete(id);
        return new Set(prev);
      });
    },
    [setSelectedSvgId]
  );

  const toggleSelect = useCallback(
    (id: SvgId) => {
      setSelectedSvgId((prev) => {
        if (prev.has(id)) {
          prev.delete(id);
          return new Set(prev);
        } else return new Set(prev.add(id));
      });
    },
    [setSelectedSvgId]
  );

  const resetSelect = useCallback(() => {
    setSelectedSvgId(new Set());
  }, [setSelectedSvgId]);

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
