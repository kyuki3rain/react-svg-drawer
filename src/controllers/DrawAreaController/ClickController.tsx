import React from "react";
import { useClickController } from "../../hooks/controllers/useClickController";

type Props = {
  children: React.ReactNode;
};

const ClickController: React.FC<Props> = ({ children }) => {
  const { onClick, onContextMenu, onMouseUpObject } = useClickController();

  return (
    <div
      onClick={(e) => {
        onClick(e.clientX, e.clientY);
      }}
      onContextMenu={(e) => {
        e.preventDefault();
        onContextMenu();
      }}
      onMouseUp={() => onMouseUpObject()}
    >
      {children}
    </div>
  );
};

export default ClickController;
