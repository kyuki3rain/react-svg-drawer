import { vp } from "./virtualPoint";

const toVirtual = (r: RealPoint, pitch: number, upperLeft: VirtualPoint) => {
  return vp.create(r.x / pitch + upperLeft.vx, r.y / pitch + upperLeft.vy);
};

const toVirtualWithSnap = (
  r: RealPoint,
  pitch: number,
  upperLeft: VirtualPoint
) => {
  return vp.create(
    Math.round(r.x / pitch + upperLeft.vx),
    Math.round(r.y / pitch + upperLeft.vy)
  );
};

const create = (x: number, y: number) => ({
  x: x as RealNumber,
  y: y as RealNumber,
});

export const rp = {
  toVirtual,
  toVirtualWithSnap,
  create,
};
