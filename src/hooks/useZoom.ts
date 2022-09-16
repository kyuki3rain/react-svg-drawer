import {
  areaConfigState,
  PITCH_MAX,
  PITCH_MIN,
} from "../states/areaConfigState";
import { useCallback } from "react";
import { useRecoilCallback } from "recoil";
import { getLimitedValue } from "../helpers/limitValue";
import * as vp from "../helpers/virtualPoint";
import * as rp from "../helpers/realPoint";

export const useZoom = () => {
  const setPitchRelative = useRecoilCallback(
    ({ set }) =>
      (relativePitch: number) => {
        set(areaConfigState, (prev) => ({
          ...prev,
          pitch: getLimitedValue(
            prev.pitch + relativePitch,
            PITCH_MIN,
            PITCH_MAX
          ),
        }));
      }
  );

  const setPitchRleativeWithCorrect = useRecoilCallback(
    ({ set }) =>
      (relativePitch: number, r: RealPoint) => {
        set(areaConfigState, (prev) => {
          const newPitch = getLimitedValue(
            prev.pitch + relativePitch,
            PITCH_MIN,
            PITCH_MAX
          );
          const oldv = rp.toVirtual(r, prev.pitch, prev.upperLeft);
          const newv = rp.toVirtual(r, newPitch, prev.upperLeft);
          return {
            pitch: newPitch,
            upperLeft: vp.sub(prev.upperLeft, vp.sub(newv, oldv)),
          };
        });
      }
  );

  const zoomIn = useCallback(
    (x?: number, y?: number) => {
      if (!x || !y) setPitchRelative(1);
      else setPitchRleativeWithCorrect(1, rp.create(x, y));
    },
    [setPitchRelative, setPitchRleativeWithCorrect]
  );

  const zoomOut = useCallback(
    (x?: number, y?: number) => {
      if (!x || !y) setPitchRelative(-1);
      else setPitchRleativeWithCorrect(-1, rp.create(x, y));
    },
    [setPitchRelative, setPitchRleativeWithCorrect]
  );

  return {
    zoomIn,
    zoomOut,
  };
};
