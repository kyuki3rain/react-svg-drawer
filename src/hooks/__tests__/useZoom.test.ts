/**
 * @jest-environment jest-environment-jsdom
 */

import { act, renderHook } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import { useZoom } from "../useZoom";
import * as vp from "../../helpers/virtualPoint";
import {
  PITCH_DEFAULT,
  PITCH_MAX,
  PITCH_MIN,
  useAreaConfig,
} from "../../states/areaConfigState";
import { usePoint } from "../usePoint";

describe("useMove", () => {
  describe("zoomIn", () => {
    test("without correct", () => {
      const { result } = renderHook(
        () => ({
          ...useZoom(),
          ...useAreaConfig(),
        }),
        { wrapper: RecoilRoot }
      );

      act(() => result.current.zoomIn());
      expect(result.current.pitch).toBe(PITCH_DEFAULT + 1);
      expect(result.current.upperLeft).toEqual(vp.create(0, 0));
    });

    test("with correct", () => {
      const { result } = renderHook(
        () => ({
          ...useZoom(),
          ...useAreaConfig(),
          ...usePoint(),
        }),
        { wrapper: RecoilRoot }
      );

      act(() => {
        const r = result.current.toReal(vp.create(10, 10));
        result.current.zoomIn(r.x, r.y);
      });
      expect(result.current.pitch).toBe(PITCH_DEFAULT + 1);
      expect(
        result.current.toVirtual(
          result.current.toReal(vp.create(10, 10)),
          false
        )
      ).toEqual(vp.create(10, 10));
    });

    test("pitch upper limit", () => {
      const { result } = renderHook(
        () => ({
          ...useZoom(),
          ...useAreaConfig(),
        }),
        { wrapper: RecoilRoot }
      );

      act(() => {
        [...Array(100)].map(result.current.zoomIn);
      });
      expect(result.current.pitch).toBe(PITCH_MAX);
    });
  });

  describe("zoomOut", () => {
    test("without correct", () => {
      const { result } = renderHook(
        () => ({
          ...useZoom(),
          ...useAreaConfig(),
        }),
        { wrapper: RecoilRoot }
      );

      act(() => result.current.zoomOut());
      expect(result.current.pitch).toBe(PITCH_DEFAULT - 1);
      expect(result.current.upperLeft).toEqual(vp.create(0, 0));
    });

    test("with correct", () => {
      const { result } = renderHook(
        () => ({
          ...useZoom(),
          ...useAreaConfig(),
          ...usePoint(),
        }),
        { wrapper: RecoilRoot }
      );

      act(() => {
        const r = result.current.toReal(vp.create(10, 10));
        result.current.zoomOut(r.x, r.y);
      });
      expect(result.current.pitch).toBe(PITCH_DEFAULT - 1);
      expect(
        result.current.toVirtual(
          result.current.toReal(vp.create(10, 10)),
          false
        )
      ).toEqual(vp.create(10, 10));
    });

    test("pitch lower limit", () => {
      const { result } = renderHook(
        () => ({
          ...useZoom(),
          ...useAreaConfig(),
        }),
        { wrapper: RecoilRoot }
      );

      act(() => {
        [...Array(100)].map(result.current.zoomOut);
      });
      expect(result.current.pitch).toBe(PITCH_MIN);
    });
  });
});
