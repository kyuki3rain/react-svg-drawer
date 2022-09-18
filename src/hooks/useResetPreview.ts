import { useRecoilCallback } from "recoil";
import { configModalState, draftConfigState } from "../states/configModalState";
import { drawModeState } from "../states/drawModeState";
import { useSetSelectedSvgId } from "../states/selectedSvgIdState";
import {
  svgObjectStates,
  useSetSvgObject,
  useSvgObjects,
} from "../states/svgObjectState";

const textConfig = new Map([["text", ""]]);

export const useResetPreview = () => {
  const { deleteSvgObject, addOrUpdateSvgObject } = useSetSvgObject("preview");
  const { resetPreviewGroup } = useSvgObjects();
  const { resetSelect } = useSetSelectedSvgId();

  const openModal = useRecoilCallback(
    ({ set }) =>
      (
        type: ConfigType,
        id: SvgId | "preview",
        configMap: Map<string, string>
      ) => {
        const configList = [...configMap].map((p) => ({
          key: p[0],
          defaultValue: p[1],
        }));
        set(configModalState, { isOpen: true, type, id, configList });
        set(draftConfigState, (prev) => {
          [...configList]?.map((c) => {
            prev.set(c.key, c.defaultValue);
          });
          return new Map(prev);
        });
      },
    []
  );

  const resetPreview = useRecoilCallback(
    ({ snapshot }) =>
      () => {
        const drawMode = snapshot.getLoadable(drawModeState).getValue();
        resetPreviewGroup();

        switch (drawMode.mode) {
          case "text": {
            const configMap = snapshot
              .getLoadable(svgObjectStates("preview"))
              .getValue()?.configMap;
            addOrUpdateSvgObject({
              type: "text",
              configMap: configMap ?? new Map(textConfig),
              style: { stroke: "black" },
            });
            openModal("text", "preview", configMap ?? new Map(textConfig));
            break;
          }
          case "copy":
            deleteSvgObject();
            break;
          case "move":
            deleteSvgObject();
            break;
          default:
            resetSelect();
            deleteSvgObject();
        }
      },
    [
      addOrUpdateSvgObject,
      deleteSvgObject,
      openModal,
      resetSelect,
      resetPreviewGroup,
    ]
  );

  return {
    resetPreview,
  };
};
