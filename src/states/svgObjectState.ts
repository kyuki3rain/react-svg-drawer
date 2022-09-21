import { nanoid } from "nanoid";
import { useCallback } from "react";
import { atom, atomFamily, useRecoilCallback, useSetRecoilState } from "recoil";
import * as vp from "../helpers/virtualPoint";

export const svgObjectStates = atomFamily<SvgObject | null, SvgId | "preview">({
  key: "svgObjectStates",
  default: () => {
    return null;
  },
});
export const svgObjectListState = atom<Set<SvgId>>({
  key: "svgObjectListState",
  default: new Set(),
});

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

  const resetPreviewGroup = useRecoilCallback(
    ({ set, snapshot }) =>
      () => {
        const obj = snapshot.getLoadable(svgObjectStates("preview")).getValue();

        if (!obj || obj.type !== "group" || !obj.fixedPoint) return;

        if (obj.isCopy) {
          obj.objectIds.map((id) => {
            set(svgObjectStates(id), null);
          });
        } else {
          const correction = vp.sub(vp.create(0, 0), obj.firstFixedPoint);
          obj.objectIds.map((id) =>
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
          set(svgObjectListState, (prev) => {
            obj.objectIds.map((id) => prev.add(id));
            return new Set(prev);
          });
        }
      },
    []
  );

  return {
    resetPreviewGroup,
    updateFixedPoint,
    copySvgObjects,
    deleteObjects,
    getObjects,
  };
};
