import React from "react";
import { useClickController } from "../operators/controllers/useClickController";

type Props = {
  children: React.ReactNode;
};

const ClickController: React.FC<Props> = ({ children }) => {
  const { onClick, onContextMenu } = useClickController();

  return (
    <div
      onClick={(e) => {
        onClick(e.clientX, e.clientY);
      }}
      onContextMenu={(e) => {
        e.preventDefault();
        onContextMenu();
      }}
    >
      {children}
    </div>
  );
};

export default ClickController;
