import * as rp from "./realPoint";
import * as vp from "./virtualPoint";

describe("realPoint", () => {
  test("create", () => {
    expect(rp.create(10, 10)).toEqual({ x: 10, y: 10 });
  });

  test("toVirtual", () => {
    const r = rp.create(10, 10);
    const pitch = 5;
    const upperLeft = vp.create(1, 2);
    expect(rp.toVirtual(r, pitch, upperLeft)).toEqual({ vx: 3, vy: 4 });
  });
});
