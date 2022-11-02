import React from "react";
import { useRecoilValue } from "recoil";
import { selectedIdListState } from "../../states/selectedIdListState";
import StyleForm from "./StyleForm";

const StyleWindow: React.FC = () => {
  const list = useRecoilValue(selectedIdListState);

  if (list.size === 0) return null;

  return <StyleForm></StyleForm>;
};

export default StyleWindow;
