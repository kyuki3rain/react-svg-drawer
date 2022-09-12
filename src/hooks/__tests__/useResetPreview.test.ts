/**
 * @jest-environment jest-environment-jsdom
 */

import { act, renderHook } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import { useDrawMode } from "../../states/drawModeState";
import { useSvgObject } from "../../states/svgObjectState";
import { useOnClick } from "../useOnClick";
import { useResetPreview } from "../useResetPreview";
import * as vp from "../../helpers/virtualPoint";
import { PITCH_DEFAULT } from "../../states/areaConfigState";

jest.mock("nanoid", () => ({
  nanoid: () => "test",
}));

describe("useRsetPreview", () => {
  test("resetPreview", () => {
    const { result } = renderHook(
      () => {
        return {
          useDrawMode: useDrawMode(),
          useResetPreview: useResetPreview(),
          useOnClick: useOnClick(),
          usePreviewObject: useSvgObject("preview"),
        };
      },
      { wrapper: RecoilRoot }
    );

    act(() => result.current.useDrawMode.changeMode("line"));
    act(() => result.current.useOnClick.onClick(20, 10));
    expect(result.current.useDrawMode.drawMode.mode).toBe("line");
    expect(result.current.usePreviewObject.svgObject).toEqual({
      id: "preview",
      type: "line",
      point1: vp.create(20 / PITCH_DEFAULT, 10 / PITCH_DEFAULT),
      style: { stroke: "black" },
    });

    act(() => result.current.useResetPreview.resetPreview());
    expect(result.current.useDrawMode.drawMode.mode).toBe("line");
    expect(result.current.usePreviewObject.svgObject).toEqual(null);
  });

  test("useEffect", () => {
    const { result } = renderHook(
      () => {
        return {
          useDrawMode: useDrawMode(),
          useResetPreview: useResetPreview(),
          useOnClick: useOnClick(),
          usePreviewObject: useSvgObject("preview"),
        };
      },
      { wrapper: RecoilRoot }
    );

    act(() => result.current.useDrawMode.changeMode("line"));
    act(() => result.current.useOnClick.onClick(20, 10));
    expect(result.current.useDrawMode.drawMode.mode).toBe("line");
    expect(result.current.usePreviewObject.svgObject).toEqual({
      id: "preview",
      type: "line",
      point1: vp.create(20 / PITCH_DEFAULT, 10 / PITCH_DEFAULT),
      style: { stroke: "black" },
    });

    act(() => result.current.useDrawMode.changeMode("selector"));
    expect(result.current.useDrawMode.drawMode.mode).toBe("selector");
    expect(result.current.usePreviewObject.svgObject).toEqual(null);
  });
});
