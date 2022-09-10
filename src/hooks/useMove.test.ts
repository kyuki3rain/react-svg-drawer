/**
 * @jest-environment jest-environment-jsdom
 */

import { act, renderHook } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import { useMove } from "./useMove";
import * as vp from "../helpers/virtualPoint";
import { useAreaConfig } from "../states/areaConfigState";

describe("useMove", () => {
  test("move", () => {
    const { result } = renderHook(
      () => ({
        useMove: useMove(),
        useAreaConfig: useAreaConfig(),
      }),
      { wrapper: RecoilRoot }
    );

    act(() => result.current.useMove.move(10, 10));
    expect(result.current.useAreaConfig.pitch).toBe(10);
    expect(result.current.useAreaConfig.upperLeft).toEqual(vp.create(1, 1));
    act(() => result.current.useMove.move(20, 10));
    expect(result.current.useAreaConfig.pitch).toBe(10);
    expect(result.current.useAreaConfig.upperLeft).toEqual(vp.create(3, 2));
  });
});
