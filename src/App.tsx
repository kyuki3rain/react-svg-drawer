import CssBaseline from "@mui/material/CssBaseline";
import React from "react";
import { RecoilRoot } from "recoil";
import ButtonArea from "./components/ButtonArea";
import DrawArea from "./components/DrawArea";
import KeyController from "./components/DrawArea/Controller/KeyController";

const App: React.FC = () => (
  <RecoilRoot>
    <CssBaseline />
    <KeyController>
      <DrawArea />
      <ButtonArea />
    </KeyController>
  </RecoilRoot>
);

export default App;
