import React from "react";
import { useKey } from "../hooks/useKey";

type Props = {
  children: React.ReactNode;
};

const KeyController: React.FC<Props> = ({ children }) => {
  const { onKeyDown, onKeyUp } = useKey();

  return (
    <div
      tabIndex={1}
      onKeyDown={(e) => onKeyDown(e.key)}
      onKeyUp={(e) => onKeyUp(e.key)}
    >
      {children}
    </div>
  );
};

export default KeyController;
