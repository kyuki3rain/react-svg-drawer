import { useRecoilCallback } from "recoil";
import { allSvgObjectSelector } from "../selectors/objectSelector";
import { logIndexState, logsState, stopLogState } from "../states/logState";

export const useLog = () => {
  const setLog = useRecoilCallback(
    ({ snapshot, set }) =>
      () => {
        const stopLog = snapshot.getLoadable(stopLogState).getValue();
        if (stopLog) {
          set(stopLogState, false);
          return;
        }
        const allSvgObject = snapshot
          .getLoadable(allSvgObjectSelector)
          .getValue();
        const logIndex = snapshot.getLoadable(logIndexState).getValue();
        set(logsState, (prev) => {
          const newLogs = prev.slice(0, logIndex);
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          newLogs.push({ objects: allSvgObject.flatMap((x) => x ?? []) });
          if (newLogs.length > 100) newLogs.shift();
          return [...newLogs];
        });
        set(logIndexState, logIndex >= 100 ? logIndex : logIndex + 1);
      },
    []
  );

  return { setLog };
};
