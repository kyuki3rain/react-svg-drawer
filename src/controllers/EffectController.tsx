import React from "react";
import { useDebugInfoEffect } from "../effects/useDebugInfoEffect";
import { useHandleResizeEffect } from "../effects/useHandleResizeEffect";
import { useResetPreviewEffect } from "../effects/useResetPreviewEffects";
import { useSetLogEffect } from "../effects/useSetLogEffect";

const EffectController: React.FC = () => {
  useResetPreviewEffect();
  useSetLogEffect();
  useHandleResizeEffect();
  useDebugInfoEffect();

  return <div></div>;
};

export default EffectController;
