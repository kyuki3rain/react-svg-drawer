/**
 * @jest-environment jest-environment-jsdom
 */

import { renderHook } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import { usePoint } from "../usePoint";
import * as rp from "../../helpers/realPoint";
import * as vp from "../../helpers/virtualPoint";

describe("usePoint", () => {
  const { result } = renderHook(() => usePoint(), { wrapper: RecoilRoot });

  test("toVirtual", () => {
    const v = vp.create(3, 4);
    expect(result.current.toReal(v)).toEqual(rp.create(30, 40));
  });

  test("toReal", () => {
    const r = rp.create(10, 20);
    expect(result.current.toVirtual(r)).toEqual(vp.create(1, 2));
  });
});
