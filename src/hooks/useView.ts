import { useAllSvgObject } from "../states/svgObjectState";
import { useFileUpload } from "./useFileUpload";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useLog } from "../states/logState";

export const useView = () => {
  const [allSvgObject, setAllSvgObject] = useAllSvgObject();
  const { uploadFile } = useFileUpload();
  const { setLog } = useLog();

  useEffect(() => {
    setLog();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allSvgObject]);

  const toJSON = () => {
    const s = JSON.stringify(
      {
        objects: allSvgObject.map((obj) => ({
          ...obj,
          configMap: obj?.configMap && Array.from(obj.configMap.entries()),
        })),
        version: __APP_VERSION__,
        appName: __APP_NAME__,
      },
      null,
      2
    );
    return s;
  };

  const fromJSON = (s: string) => {
    try {
      const json = JSON.parse(s) as View;
      if (json?.appName && json.version) {
        if (json.version !== __APP_VERSION__) {
          console.log(
            "Warning: The version of import data is not matched to this Application."
          );
          console.log(
            "This version: ",
            __APP_VERSION__,
            " import version: ",
            json.version
          );
        }
        if (json.appName !== __APP_NAME__) {
          console.log(
            "Warning: The appName of import data is not matched to this Application."
          );
          console.log(
            "This appName: ",
            __APP_NAME__,
            " import AppName: ",
            json.appName
          );
        }
      }

      if (json?.objects) {
        const allSvgObject = json.objects.map(
          (obj) =>
            obj && {
              ...obj,
              configMap: obj?.configMap && new Map(obj.configMap),
            }
        );
        setAllSvgObject(allSvgObject);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const importJSON = () => {
    if (!uploadFile) return;
    uploadFile({ accept: "*.json", multiple: false }, (p) => {
      p[0].file.text().then((s) => {
        fromJSON(s);
      });
    });
  };

  const exportJSON = () => {
    const fileName =
      "svg_drawer_" + dayjs().format("YYYYMMDD_HHmmss") + ".json";
    const data = new Blob([toJSON()], { type: "text/json" });
    const jsonURL = window.URL.createObjectURL(data);
    const link = document.createElement("a");
    document.body.appendChild(link);
    link.href = jsonURL;
    link.setAttribute("download", fileName);
    link.click();
    document.body.removeChild(link);
  };

  return {
    toJSON,
    fromJSON,
    importJSON,
    exportJSON,
  };
};
