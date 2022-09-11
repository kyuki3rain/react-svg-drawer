import React from "react";
import { useOnMouseMove } from "../../hooks/useOnMouseMove";

type Props = {
  children: React.ReactNode;
};

const MouseMoveController: React.FC<Props> = ({ children }) => {
  const { omMouseMove } = useOnMouseMove();

  return (
    <div onMouseMove={(e) => omMouseMove(e.clientX, e.clientY)}>{children}</div>
  );
};

export default MouseMoveController;
