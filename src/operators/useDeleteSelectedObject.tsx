import { useRecoilCallback } from "recoil";
import { selectedIdListState } from "../states/selectedIdListState";
import { useSelect } from "./useSelect";
import { useSvgObject } from "./useSvgObject";

export const useDeleteSelectedObjects = () => {
  const { deleteObject } = useSvgObject();
  const { resetSelect } = useSelect();

  const deleteSelectedObjectes = useRecoilCallback(
    ({ snapshot }) =>
      () => {
        [...snapshot.getLoadable(selectedIdListState).getValue()].map((id) =>
          deleteObject(id, true)
        );

        resetSelect();
      },
    [deleteObject, resetSelect]
  );

  return { deleteSelectedObjectes };
};
