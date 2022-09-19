import React from "react";
import { useResetPreviewEffects } from "../../effects/useResetPreviewEffects";
import { useSetLogEffects } from "../../effects/useSetLogEffect";

const EffectController: React.FC = () => {
  useResetPreviewEffects();
  useSetLogEffects();

  return <div></div>;
};

export default EffectController;
