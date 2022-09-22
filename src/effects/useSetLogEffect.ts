import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { useLog } from "../operators/useLog";
import { allSvgObjectSelector } from "../selectors/objectSelector";

export const useSetLogEffect = () => {
  const { setLog } = useLog();
  const allSvgObject = useRecoilValue(allSvgObjectSelector);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setLog(), [allSvgObject]);
};
