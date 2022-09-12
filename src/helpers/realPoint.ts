import { create as createVirtualPoint } from "./virtualPoint";

export const toVirtual = (
  r: RealPoint,
  pitch: number,
  upperLeft: VirtualPoint,
  isRelative?: boolean
) => {
  if (isRelative) return createVirtualPoint(r.x / pitch, r.y / pitch);
  return createVirtualPoint(
    r.x / pitch + upperLeft.vx,
    r.y / pitch + upperLeft.vy
  );
};

export const toVirtualWithSnap = (
  r: RealPoint,
  pitch: number,
  upperLeft: VirtualPoint,
  isRelative?: boolean
) => {
  if (isRelative)
    return createVirtualPoint(Math.round(r.x / pitch), Math.round(r.y / pitch));
  return createVirtualPoint(
    Math.round(r.x / pitch + upperLeft.vx),
    Math.round(r.y / pitch + upperLeft.vy)
  );
};

export const create = (x: number, y: number) => ({
  x: x as RealNumber,
  y: y as RealNumber,
});
