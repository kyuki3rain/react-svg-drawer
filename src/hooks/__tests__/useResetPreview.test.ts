/**
 * @jest-environment jest-environment-jsdom
 */

import { act, renderHook } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import { useDrawMode } from "../../states/drawModeState";
import { useSvgObject } from "../../states/svgObjectState";
import { useClickController } from "../../operators/controllers/useClickController";
import { useResetPreview } from "../useResetPreview";
import * as vp from "../../helpers/virtualPoint";
import { PITCH_DEFAULT } from "../../states/areaConfigState";
import { useEffect } from "react";

jest.mock("nanoid", () => ({
  nanoid: () => "test",
}));

describe("useRsetPreview", () => {
  test("resetPreview", () => {
    const { result } = renderHook(
      () => {
        const { resetPreview } = useResetPreview();
        const { drawMode } = useDrawMode();
        // eslint-disable-next-line react-hooks/exhaustive-deps
        useEffect(() => resetPreview(), [drawMode]);
        return {
          useDrawMode: useDrawMode(),
          useResetPreview: useResetPreview(),
          useOnClick: useClickController(),
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
      fixedPoint: vp.create(20 / PITCH_DEFAULT, 10 / PITCH_DEFAULT),
      point1: vp.create(0, 0),
      style: { stroke: "black" },
    });

    act(() => result.current.useResetPreview.resetPreview());
    expect(result.current.useDrawMode.drawMode.mode).toBe("line");
    expect(result.current.usePreviewObject.svgObject).toEqual(null);
  });
});
