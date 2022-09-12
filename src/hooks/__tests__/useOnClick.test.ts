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
import { useConfig } from "../useConfigModal";
import { useResetPreview } from "../useResetPreview";

jest.mock("nanoid", () => ({
  nanoid: () => "test",
}));

describe("useOnClick", () => {
  describe("onClick", () => {
    test("mode: line", () => {
      const { result } = renderHook(
        () => {
          return {
            useDrawMode: useDrawMode(),
            useOnClick: useOnClick(),
            useSvgObject: useSvgObject("test" as SvgId),
            usePreviewObject: useSvgObject("preview"),
          };
        },
        { wrapper: RecoilRoot }
      );

      act(() => result.current.useDrawMode.changeMode("line"));
      expect(result.current.useDrawMode.drawMode.mode).toBe("line");
      expect(result.current.useSvgObject.svgObject).toBe(null);
      expect(result.current.usePreviewObject.svgObject).toBe(null);

      act(() => {
        result.current.useOnClick.onClick(20, 10);
      });
      expect(result.current.useDrawMode.drawMode.mode).toBe("line");
      expect(result.current.useSvgObject.svgObject).toBe(null);
      expect(result.current.usePreviewObject.svgObject).toEqual({
        id: "preview",
        type: "line",
        point1: vp.create(20 / PITCH_DEFAULT, 10 / PITCH_DEFAULT),
        style: { stroke: "black" },
      });

      act(() => {
        result.current.useOnClick.onClick(30, 50);
      });
      expect(result.current.useDrawMode.drawMode.mode).toBe("line");
      expect(result.current.useSvgObject.svgObject).toEqual({
        id: "test" as SvgId,
        type: "line",
        point1: vp.create(20 / PITCH_DEFAULT, 10 / PITCH_DEFAULT),
        point2: vp.create(30 / PITCH_DEFAULT, 50 / PITCH_DEFAULT),
        style: { stroke: "black" },
      });
      expect(result.current.usePreviewObject.svgObject).toBe(null);

      const configMap = new Map([["text", "test"]]);
      act(() => {
        result.current.usePreviewObject.addOrUpdateSvgObject({
          type: "text",
          point: vp.create(0, 0),
          configMap,
          style: {},
        });
      });
      act(() => result.current.useOnClick.onClick(40, 60));
      expect(result.current.useDrawMode.drawMode.mode).toBe("line");
      expect(result.current.usePreviewObject.svgObject).toEqual({
        id: "preview",
        type: "text",
        point: vp.create(0, 0),
        configMap,
        style: {},
      });
    });

    test("mode: text", () => {
      const { result } = renderHook(
        () => {
          return {
            useDrawMode: useDrawMode(),
            useOnClick: useOnClick(),
            useResetPreview: useResetPreview(),
            useSvgObject: useSvgObject("test" as SvgId),
            usePreviewObject: useSvgObject("preview"),
            useConfig: useConfig(),
          };
        },
        { wrapper: RecoilRoot }
      );

      act(() => result.current.useDrawMode.changeMode("text"));
      expect(result.current.useDrawMode.drawMode.mode).toBe("text");
      expect(result.current.useSvgObject.svgObject).toBe(null);
      expect(result.current.usePreviewObject.svgObject).toEqual({
        id: "preview",
        type: "text",
        configMap: new Map([["text", ""]]),
        style: { stroke: "black" },
      });

      act(() => {
        result.current.useConfig.saveConfig(new Map([["text", "test"]]));
      });
      expect(result.current.useDrawMode.drawMode.mode).toBe("text");
      expect(result.current.useSvgObject.svgObject).toBe(null);
      expect(result.current.usePreviewObject.svgObject).toEqual({
        id: "preview",
        type: "text",
        configMap: new Map([["text", "test"]]),
        style: { stroke: "black" },
      });

      act(() => result.current.useOnClick.onClick(30, 50));
      expect(result.current.useDrawMode.drawMode.mode).toBe("text");
      expect(result.current.useSvgObject.svgObject).toEqual({
        id: "test" as SvgId,
        type: "text",
        point: vp.create(30 / PITCH_DEFAULT, 50 / PITCH_DEFAULT),
        configMap: new Map([["text", "test"]]),
        style: { stroke: "black" },
      });
      expect(result.current.usePreviewObject.svgObject).toEqual({
        id: "preview",
        type: "text",
        configMap: new Map([["text", "test"]]),
        style: { stroke: "black" },
      });
    });

    test("mode: selector", () => {
      const { result } = renderHook(
        () => {
          return {
            useDrawMode: useDrawMode(),
            useOnClick: useOnClick(),
            useSvgObject: useSvgObject("test" as SvgId),
            usePreviewObject: useSvgObject("preview"),
          };
        },
        { wrapper: RecoilRoot }
      );

      act(() => result.current.useDrawMode.changeMode("selector"));
      expect(result.current.useDrawMode.drawMode.mode).toBe("selector");
      expect(result.current.useSvgObject.svgObject).toBe(null);
      expect(result.current.usePreviewObject.svgObject).toBe(null);

      act(() => result.current.useOnClick.onClick(30, 50));
      expect(result.current.useDrawMode.drawMode.mode).toBe("selector");
      expect(result.current.useSvgObject.svgObject).toBe(null);
      expect(result.current.usePreviewObject.svgObject).toBe(null);
    });
  });
});
