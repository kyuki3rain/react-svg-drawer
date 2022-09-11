import React from "react";
import { useKey } from "../../hooks/useKey";

type Props = {
  children: React.ReactNode;
};

const KeyController: React.FC<Props> = ({ children }) => {
  const { onKeyDown } = useKey();

  return (
    <div tabIndex={1} onKeyDown={(e) => onKeyDown(e.code)}>
      {children}
    </div>
  );
};

export default KeyController;
