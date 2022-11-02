import { useCallback, useMemo } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import { useSvgObject } from "../operators/useSvgObject";
import { selectSvgObjectSelector } from "../selectors/objectSelector";

type Inputs = { [key: string]: string };

export const useStyleForm = () => {
  const selectedObjects = useRecoilValue(selectSvgObjectSelector);
  const { updateObject } = useSvgObject();

  const defaultValues = useMemo(
    () =>
      selectedObjects.reduce((s, obj) => {
        if (!obj || obj?.type === "group") return s;

        for (const [key, value] of Object.entries(obj.style ?? {})) {
          if (!s[key]) s[key] = value.toString();
          else if (s[key] !== value.toString()) s[key] = "";
        }

        return s;
      }, {} as Inputs),
    [selectedObjects]
  );

  const keys = useMemo(() => Object.keys(defaultValues), [defaultValues]);

  const { control, handleSubmit } = useForm<Inputs>({
    defaultValues,
  });

  const onSubmit: SubmitHandler<Inputs> = useCallback(
    (data: Inputs) => {
      console.log(`submit: ${data.name}`);
      selectedObjects.map((obj) => {
        if (!obj) return;

        switch (obj.type) {
          case "group":
            return;
          case "text":
            updateObject({
              ...obj,
              style: {
                ...obj.style,
                stroke: data.stroke !== "" ? data.stroke : obj.style.stroke,
                strokeWidth:
                  data.strokeWidth !== ""
                    ? Number(data.strokeWidth)
                    : obj.style.strokeWidth,
                fill: data.fill !== "" ? data.fill : obj.style.fill,
                fontSize:
                  data.fontSize !== ""
                    ? Number(data.fontSize)
                    : obj.style.fontSize,
              },
            });
            break;
          default:
            updateObject({
              ...obj,
              style: {
                ...obj.style,
                stroke: data.stroke !== "" ? data.stroke : obj.style.stroke,
                strokeWidth:
                  data.strokeWidth !== ""
                    ? Number(data.strokeWidth)
                    : obj.style.strokeWidth,
                fill: data.fill !== "" ? data.fill : obj.style.fill,
              },
            });
        }
      });
    },
    [selectedObjects, updateObject]
  );

  return {
    control,
    handleSubmit,
    onSubmit,
    keys,
  };
};
