import { vp } from "./virtualPoint";

export const include = (large: Area, small: Area) => {
  return (
    vp.eq(vp.min(large.upperLeft, small.upperLeft), large.upperLeft) &&
    vp.eq(vp.max(large.bottomRight, small.bottomRight), large.bottomRight)
  );
};

export const correctArea = (a: Area, point: VirtualAbsolute) => {
  return {
    upperLeft: vp.add(a.upperLeft, point) as VirtualAbsolute,
    bottomRight: vp.add(a.bottomRight, point) as VirtualAbsolute,
  };
};
