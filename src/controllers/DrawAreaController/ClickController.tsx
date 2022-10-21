import React from "react";
import { useClickController } from "../../hooks/controllers/useClickController";

type Props = {
  children: React.ReactNode;
};

const ClickController: React.FC<Props> = ({ children }) => {
  const { onClick, onContextMenu, onMousedown, onMouseup } =
    useClickController();

  return (
    <div
      onClick={(e) => {
        onClick(e.clientX, e.clientY);
      }}
      onContextMenu={(e) => {
        e.preventDefault();
        onContextMenu();
      }}
      onMouseDown={(e) => {
        onMousedown(e.clientX, e.clientY);
      }}
      onMouseUp={(e) => {
        onMouseup(e.clientX, e.clientY);
      }}
    >
      {children}
    </div>
  );
};

export default ClickController;
