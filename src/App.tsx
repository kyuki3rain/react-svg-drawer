import CssBaseline from "@mui/material/CssBaseline";
import React from "react";
import { RecoilRoot } from "recoil";
import ButtonArea from "./views/ButtonArea";
import DrawArea from "./views/DrawArea";
import AreaController from "./controllers/AreaController";
import ConfigModal from "./views/ConfigModal";
import EffectController from "./controllers/EffectController";
import DebugController from "./controllers/DebugController";

const App: React.FC = () => (
  <RecoilRoot>
    <CssBaseline />
    <AreaController>
      <DrawArea />
      <ButtonArea />
    </AreaController>
    <EffectController />
    {import.meta.env.DEV && <DebugController />}
    <ConfigModal />
  </RecoilRoot>
);

export default App;
