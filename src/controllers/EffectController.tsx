import React from "react";
import { useHandleResizeEffect } from "../effects/useHandleResizeEffect";
import { useResetPreviewEffect } from "../effects/useResetPreviewEffects";
import { useSetLogEffect } from "../effects/useSetLogEffect";

const EffectController: React.FC = () => {
  useResetPreviewEffect();
  useSetLogEffect();
  useHandleResizeEffect();

  return <div></div>;
};

export default EffectController;
