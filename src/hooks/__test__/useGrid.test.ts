import { cleanup, renderHook } from "@testing-library/react";
import { RecoilRoot, useRecoilValue } from "recoil";
import { vp } from "../../helpers/virtualPoint";
import { areaConfigState } from "../../states/areaConfigState";
import { windowSizeState } from "../../states/windowSizeState";
import { useGrid } from "../useGrid";

type InitialValue = {
  areaConfig?: { pitch: number; upperLeft: VirtualPoint };
  windowSize?: { width: number; height: number };
};

const renderRecoilHooks = (initialValue: InitialValue) =>
  renderHook(
    () => ({
      useGrid: useGrid(),
      areaConfig: useRecoilValue(areaConfigState),
      windowSize: useRecoilValue(windowSizeState),
    }),
    {
      wrapper: ({ children }: { children: React.ReactNode }) =>
        RecoilRoot({
          children,
          initializeState: ({ set }) => {
            if (initialValue.areaConfig)
              set(areaConfigState, initialValue.areaConfig);
            if (initialValue.windowSize)
              set(windowSizeState, initialValue.windowSize);
          },
        }),
    }
  );

describe("useGrid", () => {
  beforeEach(() => {
    cleanup();
  });

  describe("GridArray", () => {
    const initialValue = {
      areaConfig: { pitch: 20, upperLeft: vp.create(0.25, -1.25) },
      windowSize: { width: 1920, height: 1080 },
    };
    const { result } = renderRecoilHooks(initialValue);

    test("VerticalGridArray", () => {
      expect(result.current.useGrid.VerticalGridArray.length).toBe(96);
      result.current.useGrid.VerticalGridArray.forEach((x, i) =>
        expect(x).toBe(i * 20 + 15)
      );
    });

    test("HorizontalGridArray", () => {
      expect(result.current.useGrid.HorizontalGridArray.length).toBe(54);
      result.current.useGrid.HorizontalGridArray.forEach((y, i) =>
        expect(y).toBe(i * 20 + 5)
      );
    });
  });
});
