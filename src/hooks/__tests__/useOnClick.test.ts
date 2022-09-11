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
    test("mode: line", () => {
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

      act(() => result.current.useDrawMode.changeMode("line"));
      expect(result.current.useDrawMode.drawMode.mode).toBe("line");
      expect(result.current.useSvgObject.svgObject).toBe(null);
      expect(result.current.usePreviewObject.svgObject).toBe(null);

      act(() => result.current.useOnClick.onClick(20, 10));
      expect(result.current.useDrawMode.drawMode.mode).toBe("line");
      expect(result.current.useSvgObject.svgObject).toBe(null);
      expect(result.current.usePreviewObject.svgObject).toEqual({
        id: "preview" as SvgId,
        type: "line",
        point1: vp.create(20 / PITCH_DEFAULT, 10 / PITCH_DEFAULT),
        style: { stroke: "black" },
      });

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
  });
});
