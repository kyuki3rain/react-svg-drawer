import { useRecoilCallback } from "recoil";
import {
  allSvgObjectSelector,
  selectSvgObjectSelector,
} from "../selectors/objectSelector";
import { useSvgObject } from "./useSvgObject";

export const useJSON = () => {
  const { addObject } = useSvgObject();

  const toJSON = useRecoilCallback(
    ({ snapshot }) =>
      (isFile?: boolean) => {
        const objects = isFile
          ? snapshot.getLoadable(allSvgObjectSelector).getValue()
          : snapshot.getLoadable(selectSvgObjectSelector).getValue();
        const s = JSON.stringify(
          {
            objects: objects.map((obj) => ({
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
      (s: string, isFile?: boolean) => {
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
            const objects = json.objects.map(
              (obj) =>
                obj && {
                  ...obj,
                  configMap: obj?.configMap && new Map(obj.configMap),
                }
            );

            if (isFile) {
              set(allSvgObjectSelector, objects);
            } else {
              objects.map(
                (obj) => obj && obj.id !== "preview" && addObject(obj, obj.id)
              );
            }
          }
        } catch (e) {
          console.error(e);
        }
      },
    [addObject]
  );

  return {
    toJSON,
    fromJSON,
  };
};
