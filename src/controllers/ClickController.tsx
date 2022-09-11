import React from "react";
import { useOnClick } from "../hooks/useOnClick";

type Props = {
  children: React.ReactNode;
};

const ClickController: React.FC<Props> = ({ children }) => {
  const { onClick, onContextMenu } = useOnClick();

  return (
    <div
      onClick={(e) => {
        onClick(e.clientX, e.clientY);
        console.log("onClick");
      }}
      onContextMenu={(e) => {
        e.preventDefault();
        onContextMenu();
        console.log("onContextMenu");
      }}
    >
      {children}
    </div>
  );
};

export default ClickController;
