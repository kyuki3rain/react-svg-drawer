import CssBaseline from "@mui/material/CssBaseline";
import React from "react";
import { RecoilRoot } from "recoil";
import ButtonArea from "./views/ButtonArea";
import DrawArea from "./views/DrawArea";
import AreaController from "./components/controllers/AreaController";
import ConfigModal from "./views/ConfigModal";
import EffectController from "./components/controllers/EffectController";

const App: React.FC = () => (
  <RecoilRoot>
    <CssBaseline />
    <AreaController>
      <DrawArea />
      <ButtonArea />
    </AreaController>
    <EffectController />
    <ConfigModal />
  </RecoilRoot>
);

export default App;
