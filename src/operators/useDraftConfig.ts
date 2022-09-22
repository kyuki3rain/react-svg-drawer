import { useCallback } from "react";
import { useSetRecoilState } from "recoil";
import { draftConfigState } from "../states/configModalState";

export const useDraftConfig = () => {
  const setDraftConfigs = useSetRecoilState(draftConfigState);

  const updateDraft = useCallback(
    (key: string, value: string) => {
      setDraftConfigs((prev) => new Map(prev.set(key, value)));
    },
    [setDraftConfigs]
  );

  const resetDraft = useCallback(() => {
    setDraftConfigs(new Map());
  }, [setDraftConfigs]);

  return {
    updateDraft,
    resetDraft,
  };
};
