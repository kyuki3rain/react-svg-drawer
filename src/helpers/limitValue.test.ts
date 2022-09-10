import { getLimitedValue } from "./limitValue";

describe("limitValue", () => {
  describe("getLimitedValue", () => {
    test("under limit", () => {
      expect(getLimitedValue(-10, -4, 20)).toEqual(-4);
    });
    test("no limit", () => {
      expect(getLimitedValue(125, 100, 200)).toEqual(125);
    });
    test("over limit", () => {
      expect(getLimitedValue(30, 0, 15)).toEqual(15);
    });
  });
});
