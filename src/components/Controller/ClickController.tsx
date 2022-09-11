import React from "react";

type Props = {
  children: React.ReactNode;
};

const ClickController: React.FC<Props> = ({ children }) => {
  return (
    <div
      onClick={() => {
        console.log("onClick");
      }}
      onContextMenu={() => {
        console.log("onContextMenu");
      }}
    >
      {children}
    </div>
  );
};

export default ClickController;
