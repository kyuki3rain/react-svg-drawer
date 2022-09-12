import { create as createRealPoint } from "./realPoint";

export const add = (v1: VirtualPoint, v2: VirtualPoint) =>
  create(v1.vx + v2.vx, v1.vy + v2.vy);
export const sub = (v1: VirtualPoint, v2: VirtualPoint) =>
  create(v1.vx - v2.vx, v1.vy - v2.vy);

export const toReal = (
  v: VirtualPoint,
  pitch: number,
  upperLeft: VirtualPoint,
  isRelative?: boolean
) => {
  if (isRelative) return createRealPoint(v.vx * pitch, v.vy * pitch);
  return createRealPoint(
    (v.vx - upperLeft.vx) * pitch,
    (v.vy - upperLeft.vy) * pitch
  );
};

export const create = (x: number, y: number) => ({
  vx: x as VirtualNumber,
  vy: y as VirtualNumber,
});
