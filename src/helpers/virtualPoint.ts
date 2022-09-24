import { rp } from "./realPoint";

const add = (v1: VirtualPoint, v2: VirtualPoint) =>
  create(v1.vx + v2.vx, v1.vy + v2.vy);
const sub = (v1: VirtualPoint, v2: VirtualPoint) =>
  create(v1.vx - v2.vx, v1.vy - v2.vy);
const mulConst = (v1: VirtualPoint, c: number) => create(v1.vx * c, v1.vy * c);
const divConst = (v1: VirtualPoint, c: number) => create(v1.vx / c, v1.vy / c);
const abs = (v1: VirtualPoint) => create(Math.abs(v1.vx), Math.abs(v1.vy));

const eq = (v1: VirtualPoint, v2: VirtualPoint) =>
  v1.vx === v2.vx && v1.vy === v2.vy;

const toReal = (v: VirtualPoint, pitch: number) => {
  return rp.create(v.vx * pitch, v.vy * pitch);
};

const zero = () => create(0, 0);

const create = (x: number, y: number) => ({
  vx: x as VirtualNumber,
  vy: y as VirtualNumber,
});

export const vp = {
  add,
  sub,
  mulConst,
  divConst,
  abs,
  eq,
  toReal,
  create,
  zero,
};
