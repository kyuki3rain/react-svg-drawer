import CssBaseline from "@mui/material/CssBaseline";
import React from "react";
import { RecoilRoot } from "recoil";
import ButtonArea from "./components/ButtonArea";
import Controller from "./components/Controller";
import DrawArea from "./components/DrawArea";

const App: React.FC = () => (
  <RecoilRoot>
    <CssBaseline />
    <Controller>
      <DrawArea />
    </Controller>
    <ButtonArea />
  </RecoilRoot>
);

export default App;
