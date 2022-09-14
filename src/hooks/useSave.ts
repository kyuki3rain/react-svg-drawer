import { useView } from "./useView";

const defaultJSON = JSON.stringify({
  appName: __APP_NAME__,
  version: __APP_VERSION__,
  objects: [],
});

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

  const newView = () => {
    fromJSON(defaultJSON);
  };

  return {
    save,
    load,
    newView,
  };
};
