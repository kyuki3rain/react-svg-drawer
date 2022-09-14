import { useView } from "./useView";

export const useSave = () => {
  const { toJSON, fromJSON } = useView();

  const save = () => {
    const json = toJSON();

    localStorage.setItem("view", json);
  };

  const load = () => {
    const json = localStorage.getItem("view");
    if (!json) {
      console.error("Cannot load a backup view");
      return;
    }

    fromJSON(json);
  };

  return {
    save,
    load,
  };
};
