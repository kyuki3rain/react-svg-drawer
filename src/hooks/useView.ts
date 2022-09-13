import { useAllSvgObject } from "../states/svgObjectState";

type View = {
  allSvgObject: (SvgObject | null)[];
};

export const useView = () => {
  const [allSvgObject, setAllSvgObject] = useAllSvgObject();

  const toJSON = () => {
    const s = JSON.stringify({
      allSvgObject: allSvgObject.map((obj) => ({
        ...obj,
        configMap: obj?.configMap && Array.from(obj.configMap.entries()),
      })),
    });
    console.log(s);
    return s;
  };

  const fromJSON = (s: string) => {
    try {
      const json = JSON.parse(s) as View;
      console.log(json);
      if (json?.allSvgObject) {
        const allSvgObject = json.allSvgObject.map(
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

  return {
    toJSON,
    fromJSON,
  };
};
