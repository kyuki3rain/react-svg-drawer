import React from "react";
import { useOnMouseMoveController } from "../operators/controllers/useMouseMoveController";

type Props = {
  children: React.ReactNode;
};

const MouseMoveController: React.FC<Props> = ({ children }) => {
  const { omMouseMove } = useOnMouseMoveController();

  return (
    <div onMouseMove={(e) => omMouseMove(e.clientX, e.clientY)}>{children}</div>
  );
};

export default MouseMoveController;
