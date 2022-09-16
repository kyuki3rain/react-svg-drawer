import { useCallback } from "react";
import { useView } from "./useView";

const defaultJSON = JSON.stringify({
  appName: __APP_NAME__,
  version: __APP_VERSION__,
  objects: [],
});

export const useSave = () => {
  const { toJSON, fromJSON } = useView();

  const save = useCallback(() => {
    const json = toJSON();

    localStorage.setItem("view", json);
  }, [toJSON]);

  const load = useCallback(() => {
    const json = localStorage.getItem("view");
    if (!json) {
      console.error("Cannot load a backup view");
      return;
    }

    fromJSON(json);
  }, [fromJSON]);

  const newView = useCallback(() => {
    fromJSON(defaultJSON);
  }, [fromJSON]);

  return {
    save,
    load,
    newView,
  };
};
