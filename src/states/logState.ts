import { useMemo } from "react";
import { useRecoilState, atom, useRecoilCallback } from "recoil";
import { allSvgObjectSelector } from "./svgObjectState";

type Log = {
  objects: SvgObject[];
};

export const logsAtom = atom({
  key: "logs",
  default: [] as Log[],
});

export const logIndexAtom = atom({
  key: "logIndex",
  default: 0,
});

export const stopLogState = atom({
  key: "stopLog",
  default: false,
});

export const useRoll = () => {
  const [logs] = useRecoilState(logsAtom);
  const [logIndex] = useRecoilState(logIndexAtom);
  const canUndo = useMemo(() => logIndex > 1, [logIndex]);
  const canRedo = useMemo(() => logIndex < logs.length, [logIndex, logs]);
  return { canUndo, canRedo };
};

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
        const logIndex = snapshot.getLoadable(logIndexAtom).getValue();
        set(logsAtom, (prev) => {
          const newLogs = prev.slice(0, logIndex);
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          newLogs.push({ objects: allSvgObject.flatMap((x) => x ?? []) });
          if (newLogs.length > 100) newLogs.shift();
          return [...newLogs];
        });
        set(logIndexAtom, logIndex >= 100 ? logIndex : logIndex + 1);
      },
    []
  );

  return { setLog };
};
