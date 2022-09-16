import { useCallback, useMemo } from "react";
import { useRecoilState, atom, useSetRecoilState } from "recoil";
import { useAllSvgObject, useSetAllSvgObject } from "./svgObjectState";

type Log = {
  objects: SvgObject[];
};

const logsAtom = atom({
  key: "logs",
  default: [] as Log[],
});

const logIndexAtom = atom({
  key: "logIndex",
  default: 0,
});

const stopLogState = atom({
  key: "stopLog",
  default: false,
});

export const useRoll = () => {
  const setAllSvgObject = useSetAllSvgObject();
  const [logs] = useRecoilState(logsAtom);
  const [logIndex, setLogIndex] = useRecoilState(logIndexAtom);
  const setStopLog = useSetRecoilState(stopLogState);

  const undo = useCallback(() => {
    const nextIndex = logIndex - 1;
    setAllSvgObject(logs[nextIndex - 1].objects);
    setLogIndex(nextIndex);
    setStopLog(true);
  }, [logIndex, logs, setAllSvgObject, setLogIndex, setStopLog]);
  const canUndo = useMemo(() => logIndex > 1, [logIndex]);

  const redo = useCallback(() => {
    const nextIndex = logIndex + 1;
    setAllSvgObject(logs[nextIndex - 1].objects);
    setLogIndex(nextIndex);
    setStopLog(true);
  }, [logIndex, logs, setAllSvgObject, setLogIndex, setStopLog]);
  const canRedo = useMemo(() => logIndex < logs.length, [logIndex, logs]);

  return { undo, canUndo, redo, canRedo };
};

export const useLog = () => {
  const [allSvgObject] = useAllSvgObject();
  const setLogs = useSetRecoilState(logsAtom);
  const [logIndex, setLogIndex] = useRecoilState(logIndexAtom);
  const [stopLog, setStopLog] = useRecoilState(stopLogState);

  const setLog = useCallback(() => {
    if (stopLog) {
      setStopLog(false);
      return;
    }
    setLogs((prev) => {
      const newLogs = prev.slice(0, logIndex);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      newLogs.push({ objects: allSvgObject.flatMap((x) => x ?? []) });
      if (newLogs.length > 100) newLogs.shift();
      return [...newLogs];
    });
    setLogIndex(logIndex >= 100 ? logIndex : logIndex + 1);
  }, [allSvgObject, logIndex, setLogIndex, setLogs, setStopLog, stopLog]);

  return { setLog };
};
