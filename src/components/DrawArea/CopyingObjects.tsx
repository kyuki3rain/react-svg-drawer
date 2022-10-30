import { useRecoilValue } from "recoil";
import { rootPointSelector } from "../../selectors/rootPointSelector";
import { copyingIdsState } from "../../states/selectedIdListState";
import SvgObjectWrapper from "./SvgObjectWrapper";

export const CopyingObjects = () => {
  const copyingIds = useRecoilValue(copyingIdsState);
  const rootPoint = useRecoilValue(rootPointSelector);

  return (
    <svg>
      {[...copyingIds].map((id) => (
        <SvgObjectWrapper
          key={id}
          svgId={id}
          isSelected={false}
          parentPoint={rootPoint}
        ></SvgObjectWrapper>
      ))}
    </svg>
  );
};
