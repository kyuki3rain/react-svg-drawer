import { useRecoilCallback } from "recoil";
import { rp } from "../helpers/realPoint";
import { drawModeState } from "../states/drawModeState";
import { stopLogState } from "../states/logState";
import {
  copyingIdsState,
  selectedIdListState,
} from "../states/selectedIdListState";
import { multiSelectModeState } from "../states/selectModeState";
import { useGroupingObject } from "./useGroupingObject";
import { usePoint } from "./usePoint";
import { useSelect } from "./useSelect";
import { useSelectMode } from "./useSelectMode";
import { useSvgObject } from "./useSvgObject";

export const useOnClickObject = () => {
  const { toggleSelect } = useSelect();
  const { toMoveSelectMode } = useSelectMode();
  const { toVirtual } = usePoint();
  const { groupingObject } = useGroupingObject();
  const { copyObject } = useSvgObject();

  const onClickObject = useRecoilCallback(
    ({ snapshot }) =>
      (id: SvgId) => {
        const drawMode = snapshot.getLoadable(drawModeState).getValue();
        if (drawMode !== "selector") return false;

        toggleSelect(id);

        return true;
      },
    [toggleSelect]
  );

  const onMouseDownObject = useRecoilCallback(
    ({ snapshot, set }) =>
      (x: number, y: number, isSelected: boolean) => {
        const drawMode = snapshot.getLoadable(drawModeState).getValue();
        if (drawMode !== "selector") return false;
        if (!isSelected) return false;

        const multiSelectMode = snapshot
          .getLoadable(multiSelectModeState)
          .getValue();
        if (multiSelectMode) return false;

        if (!toMoveSelectMode()) return false;

        const selectedIdList = snapshot
          .getLoadable(selectedIdListState)
          .getValue();
        const ids = [...selectedIdList];

        set(
          copyingIdsState,
          new Set(ids.flatMap((id) => copyObject(id, false, false) ?? []))
        );

        const v = toVirtual(rp.create(x, y));
        groupingObject(v, ids, "preview");
        set(stopLogState, true);

        return true;
      },
    [copyObject, groupingObject, toMoveSelectMode, toVirtual]
  );

  return {
    onClickObject,
    onMouseDownObject,
  };
};
