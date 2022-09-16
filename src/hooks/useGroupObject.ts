import { useSelectedSvgId } from "../states/selectedSvgIdState";
import { useGroup } from "./useGroup";
import * as vp from "../helpers/virtualPoint";
import { nanoid } from "nanoid";
import { useCallback, useState } from "react";
import { useSvgObjects, useSetSvgObject } from "../states/svgObjectState";

export const useGroupObject = () => {
  const { grouping, ungrouping } = useGroup();
  const { selectedSvgId, resetSelect, select } = useSelectedSvgId();
  const [id, setId] = useState(nanoid() as SvgId);
  const { addOrUpdateSvgObject } = useSetSvgObject(id);
  const { getObjects, deleteObjects } = useSvgObjects();

  const createGroup = useCallback(() => {
    grouping(vp.create(0, 0), [...selectedSvgId]);
    addOrUpdateSvgObject({
      type: "group" as const,
      objectIds: [...selectedSvgId],
      fixedPoint: vp.create(0, 0),
      firstFixedPoint: vp.create(0, 0),
      style: {},
      isCopy: false,
    });
    setId(nanoid() as SvgId);
    resetSelect();
    select(id);
  }, [addOrUpdateSvgObject, grouping, id, resetSelect, select, selectedSvgId]);

  const removeGroup = useCallback(() => {
    getObjects([...selectedSvgId]).map((obj) => {
      if (!obj || obj.type !== "group") return;
      if (!obj.id || obj.id === "preview") return;

      ungrouping(obj);
      deleteObjects([obj.id]);
      obj.objectIds.map((objId) => select(objId));
    });
  }, [deleteObjects, getObjects, select, selectedSvgId, ungrouping]);

  return {
    createGroup,
    removeGroup,
  };
};
