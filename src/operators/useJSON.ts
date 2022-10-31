import { useRecoilCallback } from "recoil";
import { allSvgObjectSelector } from "../selectors/objectSelector";

export const useJSON = () => {
  const toJSON = useRecoilCallback(
    ({ snapshot }) =>
      () => {
        const allSvgObject = snapshot
          .getLoadable(allSvgObjectSelector)
          .getValue();
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
      },
    []
  );

  const fromJSON = useRecoilCallback(
    ({ set }) =>
      (s: string) => {
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
              return;
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
              return;
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
            set(allSvgObjectSelector, allSvgObject);
          }
        } catch (e) {
          console.error(e);
        }
      },
    []
  );

  return {
    toJSON,
    fromJSON,
  };
};
