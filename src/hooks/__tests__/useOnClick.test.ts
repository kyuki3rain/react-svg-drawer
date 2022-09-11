/**
 * @jest-environment jest-environment-jsdom
 */

import { act, renderHook } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import * as vp from "../../helpers/virtualPoint";
import { PITCH_DEFAULT } from "../../states/areaConfigState";
import { useDrawMode } from "../../states/drawModeState";
import { useOnClick } from "../useOnClick";
import { useSvgObject } from "../../states/svgObjectState";

jest.mock("nanoid", () => ({
  nanoid: () => "test",
}));

describe("useOnClick", () => {
  describe("onClick", () => {
    describe("mode: line", () => {
      const { result } = renderHook(
        () => {
          return {
            useDrawMode: useDrawMode(),
            useOnClick: useOnClick(),
            useSvgObject: useSvgObject("test" as SvgId),
            usePreviewObject: useSvgObject("preview" as SvgId),
          };
        },
        { wrapper: RecoilRoot }
      );

      test("setMode: line", () => {
        act(() => result.current.useDrawMode.changeMode("line"));
        expect(result.current.useDrawMode.drawMode.mode).toBe("line");
        expect(result.current.useSvgObject.svgObject).toBe(null);
        expect(result.current.usePreviewObject.svgObject).toBe(null);
      });

      test("first click", () => {
        act(() => result.current.useOnClick.onClick(20, 10));
        expect(result.current.useDrawMode.drawMode.mode).toBe("line");
        expect(result.current.useSvgObject.svgObject).toBe(null);
        expect(result.current.usePreviewObject.svgObject).toEqual({
          id: "preview" as SvgId,
          type: "line",
          point1: vp.create(20 / PITCH_DEFAULT, 10 / PITCH_DEFAULT),
          style: { stroke: "black" },
        });
      });

      test("second click", () => {
        act(() => result.current.useOnClick.onClick(30, 50));
        expect(result.current.useDrawMode.drawMode.mode).toBe("line");
        expect(result.current.useSvgObject.svgObject).toEqual({
          id: "test" as SvgId,
          type: "line",
          point1: vp.create(20 / PITCH_DEFAULT, 10 / PITCH_DEFAULT),
          point2: vp.create(30 / PITCH_DEFAULT, 50 / PITCH_DEFAULT),
          style: { stroke: "black" },
        });
        expect(result.current.usePreviewObject.svgObject).toBe(null);
      });

      test("preview different object", () => {
        act(() => {
          result.current.usePreviewObject.addOrUpdateSvgObject({
            type: "text",
            text: "",
            point: vp.create(0, 0),
            style: {},
          });
          result.current.useOnClick.onClick(40, 60);
        });
        expect(result.current.useDrawMode.drawMode.mode).toBe("line");
        expect(result.current.usePreviewObject.svgObject).toBe(null);
      });
    });

    describe("mode: text", () => {
      const { result } = renderHook(
        () => {
          return {
            useDrawMode: useDrawMode(),
            useOnClick: useOnClick(),
            useSvgObject: useSvgObject("test" as SvgId),
            usePreviewObject: useSvgObject("preview" as SvgId),
          };
        },
        { wrapper: RecoilRoot }
      );

      test("setMode: text", () => {
        act(() => result.current.useDrawMode.changeMode("text"));
        expect(result.current.useDrawMode.drawMode.mode).toBe("text");
        expect(result.current.useSvgObject.svgObject).toBe(null);
        expect(result.current.usePreviewObject.svgObject).toBe(null);
      });

      test("click", () => {
        act(() => result.current.useOnClick.onClick(30, 50));
        expect(result.current.useDrawMode.drawMode.mode).toBe("text");
        expect(result.current.useSvgObject.svgObject).toBe(null);
        expect(result.current.usePreviewObject.svgObject).toBe(null);
      });
    });
  });
});
