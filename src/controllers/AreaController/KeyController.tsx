import React from "react";
import { useKeyController } from "../../hooks/controllers/useKeyController";

type Props = {
  children: React.ReactNode;
};

const KeyController: React.FC<Props> = ({ children }) => {
  const { onKeyDown, onKeyUp } = useKeyController();

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
