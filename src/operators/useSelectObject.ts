import { useRecoilCallback, useSetRecoilState } from "recoil";
import { vp } from "../helpers/virtualPoint";
import { selectObjectSelector } from "../selectors/selectObjectSelector";
import { mulSelectState } from "../states/drawModeState";
import { svgObjectListState, svgObjectStates } from "../states/svgObjectState";

export const useSelectObject = () => {
  const setSvgObject = useSetRecoilState(svgObjectStates("select"));

  const resetSelectObject = useRecoilCallback(
    ({ snapshot, set }) =>
      () => {
        const list = snapshot.getLoadable(selectObjectSelector).getValue();
        set(svgObjectListState, (prev) => {
          list.forEach((id) => prev.add(id));
          return new Set(prev);
        });
        setSvgObject(null);
      },
    [setSvgObject]
  );

  const addSelectObject = useRecoilCallback(
    ({ set, snapshot }) =>
      (id: SvgId) => {
        const mulSelect = snapshot.getLoadable(mulSelectState).getValue();
        if (!mulSelect) resetSelectObject();

        set(svgObjectStates("select"), (prev) => {
          if (prev && prev.type !== "group") return null;
          if (prev)
            return {
              ...prev,
              objectIds: prev?.objectIds ? [...prev.objectIds, id] : [id],
              id: "select" as const,
            };
          return {
            type: "group" as const,
            objectIds: [id],
            id: "select" as const,
            isCopy: false,
            fixedPoint: vp.zero() as VirtualAbsolute,
            firstFixedPoint: vp.zero() as VirtualAbsolute,
            style: {},
          };
        });

        set(svgObjectListState, (prev) => {
          prev.delete(id);
          return new Set(prev);
        });
      },
    [resetSelectObject]
  );

  const removeSelectObject = useRecoilCallback(
    ({ set }) =>
      (id: SvgId) => {
        setSvgObject((prev) => {
          if (prev?.type !== "group") return null;

          return {
            ...prev,
            objectIds: prev.objectIds.filter((i) => i !== id),
          };
        });
        set(svgObjectListState, (prev) => new Set(prev.add(id)));
      },
    [setSvgObject]
  );

  return {
    addSelectObject,
    removeSelectObject,
    resetSelectObject,
  };
};
