import CssBaseline from "@mui/material/CssBaseline";
import React from "react";
import { RecoilRoot } from "recoil";
import ButtonArea from "./components/ButtonArea";
import DrawArea from "./components/DrawArea";
import AreaController from "./components/AreaController";
import ConfigModal from "./components/ConfigModal";

const App: React.FC = () => (
  <RecoilRoot>
    <CssBaseline />
    <AreaController>
      <DrawArea />
      <ButtonArea />
    </AreaController>
    <ConfigModal />
  </RecoilRoot>
);

export default App;
