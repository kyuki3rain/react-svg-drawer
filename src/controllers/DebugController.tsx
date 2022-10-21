import React from "react";
import { useDebugInfoEffect } from "../effects/useDebugInfoEffect";

const DebugController: React.FC = () => {
  useDebugInfoEffect();

  return <div></div>;
};

export default DebugController;
