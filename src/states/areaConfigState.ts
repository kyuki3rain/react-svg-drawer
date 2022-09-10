import { atom, useRecoilValue, useSetRecoilState } from "recoil";
import { getLimitedValue } from "../helpers/limitValue";
import * as vp from "../helpers/virtualPoint";
import * as rp from "../helpers/realPoint";

type AreaConfig = {
  pitch: number;
  upperLeft: VirtualPoint;
};

const PITCH_MIN = 0;
const PITCH_MAX = 50;

const areaConfigState = atom({
  key: "areaConfigState",
  default: { pitch: 10, upperLeft: vp.create(0, 0) },
});

export const useAreaConfig = () => useRecoilValue(areaConfigState);

export const useSetAreaConfig = () => {
  const setAreaConfig = useSetRecoilState(areaConfigState);

  const getNewAreaConfig = (
    prev: AreaConfig,
    next?: { pitch?: number; upperLeft?: VirtualPoint }
  ) => ({
    ...prev,
    ...next,
  });

  const setPitchRelative = (relativePitch: number) => {
    setAreaConfig((prev) =>
      getNewAreaConfig(prev, {
        pitch: getLimitedValue(
          prev.pitch + relativePitch,
          PITCH_MIN,
          PITCH_MAX
        ),
      })
    );
  };

  const setPitchRleativeWithCorrect = (relativePitch: number, r: RealPoint) => {
    setAreaConfig((prev) => {
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
  };

  const setUpperLeftRelative = (v: VirtualPoint) => {
    setAreaConfig((prev) =>
      getNewAreaConfig(prev, {
        upperLeft: vp.add(prev.upperLeft, v),
      })
    );
  };

  return {
    incPitch: () => setPitchRelative(1),
    decPitch: () => setPitchRelative(-1),

    incPitchWithCorrect: (r: RealPoint) => setPitchRleativeWithCorrect(1, r),
    decPitchWithCorrect: (r: RealPoint) => setPitchRleativeWithCorrect(-1, r),

    ToLeftArea: (d: number) => setUpperLeftRelative(vp.create(-d, 0)),
    ToRightArea: (d: number) => setUpperLeftRelative(vp.create(d, 0)),
    ToTopArea: (d: number) => setUpperLeftRelative(vp.create(0, -d)),
    ToBottomArea: (d: number) => setUpperLeftRelative(vp.create(0, d)),
  };
};