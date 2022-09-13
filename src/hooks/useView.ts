import { useAllSvgObject } from "../states/svgObjectState";
import { useFileUpload } from "./useFileUpload";
import dayjs from "dayjs";

export const useView = () => {
  const [allSvgObject, setAllSvgObject] = useAllSvgObject();
  const { uploadFile } = useFileUpload();

  const toJSON = () => {
    const s = JSON.stringify(
      {
        objects: allSvgObject.map((obj) => ({
          ...obj,
          configMap: obj?.configMap && Array.from(obj.configMap.entries()),
        })),
        version: process.env.REACT_APP_VERSION,
        appName: process.env.REACT_APP_NAME,
      },
      null,
      2
    );
    console.log(s);
    return s;
  };

  const fromJSON = (s: string) => {
    try {
      const json = JSON.parse(s) as View;
      console.log(json);
      if (json?.appName && json.version) {
        if (json.version !== process.env.REACT_APP_VERSION) {
          console.log(
            "Warning: The version of import data is not matched to this Application."
          );
          console.log(
            "This version: ",
            process.env.REACT_APP_VERSION,
            " import version: ",
            json.version
          );
        }
        if (json.appName !== process.env.REACT_APP_NAME) {
          console.log(
            "Warning: The appName of import data is not matched to this Application."
          );
          console.log(
            "This appName: ",
            process.env.REACT_APP_NAME,
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
    link.setAttribute("export", fileName);
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
