import * as vp from "./virtualPoint";

describe("virtualPoint", () => {
  test("create", () => {
    expect(vp.create(1, 2)).toEqual({ vx: 1, vy: 2 });
  });

  test("add", () => {
    const v1 = vp.create(1, 2);
    const v2 = vp.create(5, 3);
    expect(vp.add(v1, v2)).toEqual({ vx: 6, vy: 5 });
  });

  test("sub", () => {
    const v1 = vp.create(1, 2);
    const v2 = vp.create(5, 3);
    expect(vp.sub(v1, v2)).toEqual({ vx: -4, vy: -1 });
  });

  test("toReal", () => {
    const v = vp.create(3, 5);
    const pitch = 5;
    const upperLeft = vp.create(1, 2);
    expect(vp.toReal(v, pitch, upperLeft)).toEqual({ x: 10, y: 15 });
  });
});
