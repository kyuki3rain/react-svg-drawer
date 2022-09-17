import React from "react";
import { useResetPreviewEffects } from "../effects/useResetPreviewEffects";

const EffectController: React.FC = () => {
  useResetPreviewEffects();

  return <div></div>;
};

export default EffectController;
