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

  const upload = () => {
    if (!uploadFile) return;
    uploadFile({ accept: "*.json", multiple: false }, (p) => {
      p[0].file.text().then((s) => {
        fromJSON(s);
      });
    });
  };

  const download = () => {
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
    upload,
    download,
  };
};
