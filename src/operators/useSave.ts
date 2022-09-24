import { useCallback } from "react";
import { useJSON } from "./useJSON";

const defaultJSON = JSON.stringify({
  appName: __APP_NAME__,
  version: __APP_VERSION__,
  objects: [],
});

export const useSave = () => {
  const { toJSON, fromJSON } = useJSON();

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
