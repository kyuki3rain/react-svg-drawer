import React from "react";
import { useKeyController } from "../../hooks/controllers/useKeyController";

type Props = {
  children: React.ReactNode;
};

const KeyController: React.FC<Props> = ({ children }) => {
  const { onKeyDown, onKeyUp, ref } = useKeyController();

  return (
    <div
      ref={ref}
      tabIndex={-1}
      onKeyDown={(e) => onKeyDown(e.key, e.ctrlKey || e.metaKey, e.shiftKey)}
      onKeyUp={(e) => onKeyUp(e.key)}
      id="keyController"
    >
      {children}
    </div>
  );
};

export default KeyController;
