import { useSelectObject } from "./useSelectObject";

export const useSelect = () => {
  const { addSelectObject, removeSelectObject, resetSelectObject } =
    useSelectObject();

  return {
    select: addSelectObject,
    unselect: removeSelectObject,
    resetSelect: resetSelectObject,
  };
};
