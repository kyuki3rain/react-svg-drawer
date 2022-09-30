import { cleanup, renderHook } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { RecoilRoot, useRecoilValue } from "recoil";
import {
  configModalState,
  draftConfigState,
} from "../../states/configModalState";
import { drawModeState } from "../../states/drawModeState";
import { svgObjectStates } from "../../states/svgObjectState";
import { useConfigModal } from "../useConfigModal";

type InitialValue = {
  configModal?: {
    id: SvgId | "preview" | "select";
    isOpen: boolean;
    type: ConfigType;
  };
  draftConfig?: Map<string, string>;
  preview: SvgObject;
};

jest.mock("nanoid", () => {
  return { nanoid: () => "test" };
});

const renderRecoilHooks = (initialValue: InitialValue) =>
  renderHook(
    () => ({
      useConfigModal: useConfigModal(),
      preview: useRecoilValue(svgObjectStates("preview")),
      mode: useRecoilValue(drawModeState),
    }),
    {
      wrapper: ({ children }: { children: React.ReactNode }) =>
        RecoilRoot({
          children,
          initializeState: ({ set }) => {
            if (initialValue.configModal)
              set(configModalState, initialValue.configModal);
            if (initialValue.draftConfig)
              set(draftConfigState, initialValue.draftConfig);
            if (initialValue.preview)
              set(svgObjectStates("preview"), initialValue.preview);
          },
        }),
    }
  );

describe("useConfigModal", () => {
  describe("configModal", () => {
    beforeEach(() => {
      cleanup();
    });

    const initialValue = {
      configModal: {
        isOpen: true,
        type: "none" as ConfigType,
        id: "preview" as const,
      },
      draftConfig: new Map([["text", ""]]),
      preview: {
        type: "text",
        configMap: new Map([["text", ""]]),
        style: { stroke: "black" },
      } as TextObject,
    };

    test("initialize", () => {
      const { result } = renderRecoilHooks(initialValue);

      expect(result.current.useConfigModal.isOpen).toBe(true);
      expect(result.current.useConfigModal.type).toBe("none");
      expect(result.current.useConfigModal.draftConfigs.size).toBe(1);
      result.current.useConfigModal.draftConfigs.forEach((v, k) => {
        expect(k).toBe("text");
        expect(v).toBe("");
      });
      expect(result.current.preview?.configMap?.size).toBe(1);
      result.current.preview?.configMap?.forEach((v, k) => {
        expect(k).toBe("text");
        expect(v).toBe("");
      });
    });

    test("onChange", () => {
      const { result } = renderRecoilHooks(initialValue);

      act(() => result.current.useConfigModal.onChange("text", "test"));

      expect(result.current.useConfigModal.draftConfigs.size).toBe(1);
      result.current.useConfigModal.draftConfigs.forEach((v, k) => {
        expect(k).toBe("text");
        expect(v).toBe("test");
      });
      expect(result.current.preview?.configMap?.size).toBe(1);
      result.current.preview?.configMap?.forEach((v, k) => {
        expect(k).toBe("text");
        expect(v).toBe("");
      });
    });

    test("saveConfig", () => {
      const { result } = renderRecoilHooks(initialValue);

      act(() => {
        result.current.useConfigModal.onChange("text", "test");
        result.current.useConfigModal.saveConfig();
      });

      expect(result.current.useConfigModal.isOpen).toBe(false);
      expect(result.current.preview?.configMap?.size).toBe(1);
      result.current.preview?.configMap?.forEach((v, k) => {
        expect(k).toBe("text");
        expect(v).toBe("test");
      });
    });

    test("handleClose", () => {
      const { result } = renderRecoilHooks(initialValue);

      act(() => {
        result.current.useConfigModal.onChange("text", "test");
        result.current.useConfigModal.handleClose();
      });

      expect(result.current.useConfigModal.isOpen).toBe(false);
      expect(result.current.useConfigModal.type).toBe("none");
      expect(result.current.useConfigModal.draftConfigs.size).toBe(0);
      expect(result.current.mode).toBe("selector");
      expect(result.current.preview?.configMap?.size).toBe(1);
      result.current.preview?.configMap?.forEach((v, k) => {
        expect(k).toBe("text");
        expect(v).toBe("");
      });
    });
  });
});
