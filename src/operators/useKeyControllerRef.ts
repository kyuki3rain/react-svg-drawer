import { useRecoilCallback } from "recoil";
import { keyControllerRefState } from "../states/keyControllerRefState";

export const useKeyControllerRef = () => {
  const focus = useRecoilCallback(({ snapshot }) => () => {
    const ref = snapshot.getLoadable(keyControllerRefState).getValue();
    if (ref?.current) ref.current.focus();
  });

  return { focus };
};
