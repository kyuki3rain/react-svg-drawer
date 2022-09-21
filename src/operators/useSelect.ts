import { useCallback } from "react";
import { useSetRecoilState } from "recoil";
import { selectedSvgIdState } from "../states/selectedSvgIdState";

export const useSelect = () => {
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
