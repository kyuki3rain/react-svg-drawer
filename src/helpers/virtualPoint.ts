import { rp } from "./realPoint";

const add = (v1: VirtualPoint, v2: VirtualPoint) =>
  create(v1.vx + v2.vx, v1.vy + v2.vy);
const sub = (v1: VirtualPoint, v2: VirtualPoint) =>
  create(v1.vx - v2.vx, v1.vy - v2.vy);
const mulConst = (v1: VirtualPoint, c: number) => create(v1.vx * c, v1.vy * c);
const divConst = (v1: VirtualPoint, c: number) => create(v1.vx / c, v1.vy / c);
const abs = (v1: VirtualPoint) => create(Math.abs(v1.vx), Math.abs(v1.vy));

const max = (v1: VirtualPoint, v2: VirtualPoint) =>
  create(Math.max(v1.vx, v2.vx), Math.max(v1.vy, v2.vy));

const min = (v1: VirtualPoint, v2: VirtualPoint) =>
  create(Math.min(v1.vx, v2.vx), Math.min(v1.vy, v2.vy));

const eq = (v1: VirtualPoint, v2: VirtualPoint) =>
  v1.vx === v2.vx && v1.vy === v2.vy;

const toReal = (v: VirtualPoint, pitch: number) => {
  return rp.create(v.vx * pitch, v.vy * pitch);
};

const zero = () => create(0, 0);
const one = () => create(1, 1);
const maxVec = () => create(Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
const minVec = () => create(Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER);

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
  max,
  min,
  eq,
  toReal,
  create,
  zero,
  one,
  maxVec,
  minVec,
};
