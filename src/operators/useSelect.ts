import { useCallback } from "react";
import { useSetRecoilState } from "recoil";
import { selectedIdListState } from "../states/selectedIdListState";

export const useSelect = () => {
  const setselectedIdList = useSetRecoilState(selectedIdListState);

  const select = useCallback(
    (id: SvgId) => {
      console.log(id);
      setselectedIdList((prev) => new Set(prev.add(id)));
    },
    [setselectedIdList]
  );

  const unselect = useCallback(
    (id: SvgId) => {
      setselectedIdList((prev) => {
        prev.delete(id);
        return new Set(prev);
      });
    },
    [setselectedIdList]
  );

  const toggleSelect = useCallback(
    (id: SvgId) => {
      setselectedIdList((prev) => {
        if (prev.has(id)) {
          prev.delete(id);
          return new Set(prev);
        } else return new Set(prev.add(id));
      });
    },
    [setselectedIdList]
  );

  const resetSelect = useCallback(() => {
    setselectedIdList(new Set());
  }, [setselectedIdList]);

  return {
    select,
    unselect,
    toggleSelect,
    resetSelect,
  };
};
